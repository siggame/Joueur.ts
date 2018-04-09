// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Move } from "./move";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A chess piece.
 */
export class Piece extends GameObject {

    /**
     * When the Piece has been captured (removed from the board) this is true.
     * Otherwise false.
     */
    public readonly captured!: boolean;

    /**
     * The file (column) coordinate of the Piece represented as a letter [a-h],
     * with 'a' starting at the left of the board.
     */
    public readonly file!: string;

    /**
     * If the Piece has moved from its starting position.
     */
    public readonly hasMoved!: boolean;

    /**
     * The player that controls this chess Piece.
     */
    public readonly owner!: Player | undefined;

    /**
     * The rank (row) coordinate of the Piece represented as a number [1-8],
     * with 1 starting at the bottom of the board.
     */
    public readonly rank!: number;

    /**
     * The type of chess Piece this is, either 'King, 'Queen', 'Knight', 'Rook',
     * 'Bishop', or 'Pawn'.
     */
    public readonly type!: string;

    /**
     * Moves the Piece from its current location to the given rank and file.
     * @param file The file coordinate to move to. Must be [a-h].
     * @param rank The rank coordinate to move to. Must be [1-8].
     * @param promotionType If this is a Pawn moving to the end of the board
     * then this parameter is what to promote it to. When used must be 'Queen',
     * 'Knight', 'Rook', or 'Bishop'.
     * @returns The Move you did if successful, otherwise null if invalid. In
     * addition if your move was invalid you will lose.
     */
    public async move(file: string, rank: number, promotionType: string = ""):
                      Promise<Move | undefined> {
        return this.runOnServer("move", {
            file,
            rank,
            promotionType,
        });
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
