// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./ai";
import { Game } from "./game";

import { Bomb } from "./bomb";
import { GameObject } from "./game-object";
import { Miner } from "./miner";
import { Player } from "./player";
import { Tile } from "./tile";
import { Upgrade } from "./upgrade";

/**
 * This is a collection of all the classes that Coreminer uses to work.
 * @hidden
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
        Bomb,
        GameObject,
        Miner,
        Player,
        Tile,
        Upgrade,
    },
    gameVersion: "a4592bb5acb0415146605769f439a09baf3768f41cdb3c7ad9dc971f42c4d96e",
};
