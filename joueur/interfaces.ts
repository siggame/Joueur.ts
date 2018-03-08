import { BaseAI } from "./base-ai";
import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";

export interface IGameNamespace {
    AI: typeof BaseAI;
    Game: typeof BaseGame;
    GameObjectClasses: {
        [className: string]: typeof BaseGameObject;
    };
}

export interface IBasePlayer extends BaseGameObject {
    name: string;
    won: boolean;
    lost: boolean;
    reasonWon: string;
    reasonLost: string;
}
