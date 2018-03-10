// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

import { BaseGame } from "../../joueur/base-game";
import { GameObject } from "./game-object";
import { Move } from "./move";
import { Piece } from "./piece";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * The traditional 8x8 chess board with pieces.
 */
export class Game extends BaseGame {

    /**
     * The player whose turn it is currently. That player can send commands.
     * Other players cannot.
     */
    public readonly currentPlayer!: Player | undefined;

    /**
     * The current turn number, starting at 0 for the first player's turn.
     */
    public readonly currentTurn!: number;

    /**
     * Forsythâ€“Edwards Notation, a notation that describes the game board.
     */
    public readonly fen!: string;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: {[id: string]: GameObject | undefined};

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * The list of Moves that have occurred, in order.
     */
    public readonly moves!: Move[];

    /**
     * All the uncaptured Pieces in the game.
     */
    public readonly pieces!: Piece[];

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * How many turns until the game ends because no pawn has moved and no Piece
     * has been taken.
     */
    public readonly turnsToDraw!: number;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
