// This is where you build your AI for the Chess game.

import { BaseAI } from "../../joueur/base-ai";
import { Game } from "./game";
import { Player } from "./player";

/**
 * This is the class to play the Chess game.
 * This is where you should build your AI.
 */
export class AI extends BaseAI {
    /**
     * The reference to the Game instance this AI is playing.
     */
    public readonly game!: Game;

    /**
     * The reference to the Player this AI controls in the Game.
     */
    public readonly player!: Player;
    /**
     * This is the name you send to the server so your AI
     * will control the player named this string.
     *
     * @returns A string for the name of your player.
     */
    public getName(): string {
        return "Chess JavaScript Player";
    }

    /**
     * This is called once the game starts and your AI knows its playerID and game.
     * You can initialize your AI here.
     */
    public async start(): Promise<void> {
        // pass
    }

    /**
     * This is called every time the game's state updates, so if you are tracking anything you can update it here.
     */
    public async gameUpdated(): Promise<void> {
        // pass
    }

    /**
     * This is called when the game ends, you can clean up your data and dump files here if need be.
     *
     * @param won True means you won, false means you lost.
     * @param reason The human readable string explaining why you won or lost.
     */
    public async ended(won: boolean, reason: string): Promise<void> {
        // pass
    }
    /**
     * This is called every time it is this AI.player's turn to make a move.
     * @returns A string in Universal Chess Inferface (UCI) or Standard
     * Algebraic Notation (SAN) formatting for the move you want to make. If the
     * move is invalid or not properly formatted you will lose the game.
     */
    public async makeMove(): Promise<string> {
        // Put your game logic here for makeMove
        return "";
    }

}
