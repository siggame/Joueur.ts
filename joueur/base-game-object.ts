import { client } from "./client";

/**
 * The base class that every game object within a game inherit from for
 * runtime manipulation that would be redundant via Creer
 */
export class BaseGameObject {
    public readonly gameObjectName: string = "";
    public readonly id: string = "";

    // protected to discourage competitors from using this
    protected constructor() {}

    /**
     * toString override for easier debugging
     * @returns a human readable representation of the game object
     */
    public toString(): string {
        return `${this.gameObjectName} #${this.id}`;
    }

    /**
     * Runs a function on the game server on behalf of this game object
     * @param functionName the name of the member function of this class
     * @param args key/value args to send to the server
     */
    protected runOnServer(functionName: string, args: {
        [key: string]: any;
    }): Promise<any> {
        return client.runOnServer(this, functionName, args);
    }
}
