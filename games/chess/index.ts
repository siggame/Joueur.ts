// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./AI";
import { Game } from "./game";

import { GameObject } from "./game-object";
import { Move } from "./move";
import { Piece } from "./piece";
import { Player } from "./player";

/**
 * This is a collection of all the classes that Chess uses to work.
 * @hidden
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
      GameObject,
      Move,
      Piece,
      Player,
    },
};
