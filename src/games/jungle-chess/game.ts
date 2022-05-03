// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A 7x9 board game with pieces, to win the game the players must make
 * successful captures of the enemy and reach the opponents den.
 */
export class Game extends BaseGame {

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * The list of [known] moves that have occurred in the game, in a format.
     * The first element is the first move, with the last element being the most
     * recent.
     */
    public readonly history!: string[];

    /**
     * The jungleFen is similar to the chess FEN, the order looks like this,
     * board (split into rows by '/'), whose turn it is, half move, and full
     * move.
     */
    public readonly jungleFen!: string;

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
