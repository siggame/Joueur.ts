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
 * Contains all details about a Piece's move in the game.
 */
export class Move extends GameObject {

    /**
     * The Piece captured by this Move, null if no capture.
     */
    public readonly captured!: Piece | undefined;

    /**
     * The file the Piece moved from.
     */
    public readonly fromFile!: string;

    /**
     * The rank the Piece moved from.
     */
    public readonly fromRank!: number;

    /**
     * The Piece that was moved.
     */
    public readonly piece!: Piece | undefined;

    /**
     * The Piece type this Move's Piece was promoted to from a Pawn, empty
     * string if no promotion occurred.
     */
    public readonly promotion!: string;

    /**
     * The standard algebraic notation (SAN) representation of the move.
     */
    public readonly san!: string;

    /**
     * The file the Piece moved to.
     */
    public readonly toFile!: string;

    /**
     * The rank the Piece moved to.
     */
    public readonly toRank!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
