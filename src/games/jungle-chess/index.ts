// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./ai";
import { Game } from "./game";

import { GameObject } from "./game-object";
import { Player } from "./player";

/**
 * This is a collection of all the classes that JungleChess uses to work.
 * @hidden
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
        GameObject,
        Player,
    },
    gameVersion: "0f0b85b33f03a669a391b36c90daa195d028dd1f21f8d4b601adfcf39b23eee2",
};
