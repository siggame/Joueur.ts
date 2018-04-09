// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Piece } from "./piece";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A player in this game. Every AI controls one player.
 */
export class Player extends GameObject {

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    public readonly clientType!: string;

    /**
     * The color (side) of this player. Either 'White' or 'Black', with the
     * 'White' player having the first move.
     */
    public readonly color!: string;

    /**
     * True if this player is currently in check, and must move out of check,
     * false otherwise.
     */
    public readonly inCheck!: boolean;

    /**
     * If the player lost the game or not.
     */
    public readonly lost!: boolean;

    /**
     * If the Player has made their move for the turn. true means they can no
     * longer move a Piece this turn.
     */
    public readonly madeMove!: boolean;

    /**
     * The name of the player.
     */
    public readonly name!: string;

    /**
     * This player's opponent in the game.
     */
    public readonly opponent!: Player | undefined;

    /**
     * All the uncaptured chess Pieces owned by this player.
     */
    public readonly pieces!: Piece[];

    /**
     * The direction your Pieces must go along the rank axis until they reach
     * the other side. Will be +1 if the Player is 'White', or -1 if the Player
     * is 'Black'.
     */
    public readonly rankDirection!: number;

    /**
     * The reason why the player lost the game.
     */
    public readonly reasonLost!: string;

    /**
     * The reason why the player won the game.
     */
    public readonly reasonWon!: string;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    public readonly timeRemaining!: number;

    /**
     * If the player won the game or not.
     */
    public readonly won!: boolean;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
