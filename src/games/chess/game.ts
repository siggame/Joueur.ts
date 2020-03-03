// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { BaseGame } from "../../joueur/base-game";
import { GameObject } from "./game-object";
import { Player } from "./player";


/**
 * The traditional 8x8 chess board with pieces.
 */
export class Game extends BaseGame {

    /**
     * Forsyth-Edwards Notation (fen), a notation that describes the game board
     * state.
     */
    public readonly fen!: string;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public readonly gameObjects!: { [id: string]: GameObject | undefined };

    /**
     * The list of [known] moves that have occurred in the game, in Universal
     * Chess Inferface (UCI) format. The first element is the first move, with
     * the last element being the most recent.
     */
    public readonly history!: string[];

    /**
     * List of all the players in the game.
     */
    public readonly players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

}
