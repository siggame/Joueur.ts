import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";
import { ErrorCode, handleError } from "./handle-error";
import * as Serializer from "./serializer";

// tslint:disable typedef no-any no-parameter-properties

export interface IServerConstants {
    DELTA_LIST_LENGTH: string;
    DELTA_REMOVED: string;
}

// @class GameManager: basically state management. Competitors do not modify
export class BaseGameManager {
    public serverConstants: IServerConstants = {
        DELTA_LIST_LENGTH: "",
        DELTA_REMOVED: "",
    };

    // Allow until the first delta merge ends
    private allowGameObjectSets = true;

    // Map of game object ids to a mapping of their member values
    private privateValues = new Map<BaseGameObject, {
        [key: string]: Serializer.SerializableTypes;
    }>();

    // Sets up the game
    public constructor(
        private game: BaseGame,
        private gameObjectClasses: { [className: string]: typeof BaseGameObject },
    ) {
        // Pass
    }

    public getMemberValue(gameObject: BaseGameObject, memberName: string): any {
        const privateValues = this.privateValues.get(gameObject);

        if (!privateValues) {
            throw new Error(`Cannot get private values for ${gameObject}`);
        }

        return privateValues[memberName];
    }

    public setMemberValue(gameObject: BaseGameObject, memberName: string, value: any): void {
    // Check to make sure the AI is not trying to set a member value
    // (this should only be called during _mergeDelta, in which case no error will be thrown)
    if (!this.allowGameObjectSets) {
      throw new Error(`Setting '${memberName}' not allowed! Member variables are read only to AIs.`);
    }

    let privateValues = this.privateValues.get(gameObject);

    if (!privateValues) {
      privateValues = {};
      this.privateValues.set(gameObject, privateValues);
    }

    privateValues[memberName] = value;
  }

    /**
     * Applies a delta state (change in state information) to this game
     */
    public applyDeltaState(delta: any): void {
        this.allowGameObjectSets = true;
        if (delta.gameObjects !== undefined) {
            this.initGameObjects(delta.gameObjects);
        }

        this.mergeDelta(this.game, delta);
        this.allowGameObjectSets = false;
    }

    /**
     * Game objects can be references in the delta states for cycles, they will
     * all point to the game objects here.
     */
    private initGameObjects(gameObjects: { [ id: string ]: any }): void {
        for (const [id, gameObject] of Object.entries(gameObjects)) {
            if (this.game.gameObjects[id] === undefined) {
                // Then this a new game object that we need to create as a class instance
                const gameObjectClass = this.gameObjectClasses[gameObject.gameObjectName];

                if (!gameObjectClass) {
                    handleError(
                        ErrorCode.DELTA_MERGE_FAILURE,
                        `Cannot create game object class ${gameObject.gameObjectName} for #${id}`,
                    );
                }

                // the class constructor is protected so competitors don't try
                // to instantiate instances, but we actually need to here;
                // so cast it to any to fake make it public
                this.game.gameObjects[id] = new (gameObjectClass as any)();
            }
        }
    }

    /**
     * Recursively merges delta changes to the game.
     */
    private mergeDelta(state: any, delta: any): any {
        const deltaLength: number | undefined = delta[this.serverConstants.DELTA_LIST_LENGTH];

        if (deltaLength !== undefined) {
            // Then this part in the state is an array

            // We don't want to copy this key/value over to the state, it was just to signify the delta is an array
            // tslint:disable-next-line:no-dynamic-delete
            delete delta[this.serverConstants.DELTA_LIST_LENGTH];

            while (state.length > deltaLength) {
                // Pop elements off the array until the array is short enough.
                // An increase in array size will be added below as arrays resize when keys larger are set
                state.pop();
            }
        }

        for (const [key, d] of Object.entries(delta)) {
            let stateKey: any = key;
            if (deltaLength !== undefined) {
                stateKey = Number(key);
            }

            if (d === this.serverConstants.DELTA_REMOVED) {
                // tslint:disable-next-line:no-dynamic-delete
                delete state[stateKey];
            } else if (Serializer.isGameObjectReference(d)) {
                state[stateKey] = this.game.gameObjects[d.id];
            } else if (Serializer.isObject(d) && Serializer.isObject(state[stateKey])) {
                this.mergeDelta(state[stateKey], d);
            } else {
                if (Serializer.isObject(d)) {
                    const dIsArray = (d[this.serverConstants.DELTA_LIST_LENGTH] !== undefined);
                    state[stateKey] = this.mergeDelta(dIsArray ? [] : {}, d);
                } else {
                    state[stateKey] = d;
                }
            }
        }

        return state;
    }
}
