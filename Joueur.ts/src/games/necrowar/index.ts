// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./ai";
import { Game } from "./game";

import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";
import { Tower } from "./tower";
import { Unit } from "./unit";
import { tJob } from "./t-job";
import { uJob } from "./u-job";

/**
 * This is a collection of all the classes that Necrowar uses to work.
 * @hidden
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
        GameObject,
        Player,
        Tile,
        Tower,
        Unit,
        tJob,
        uJob,
    },
    gameVersion: "ef6ca70466db36f35dc3f4cc6fc18fc9db44a2140bd387bcb2ad00aae009f51e",
};
