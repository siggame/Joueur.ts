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
     * This is called every time the game"s state updates, so if you are tracking anything you can update it here.
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
        this.printPrettyFEN();

        // This will only work if we are black move the pawn at b2 to b3.
        // Otherwise we will lose.
        // Your job is to code SOMETHING to parse the FEN string in some way to determine a valid move, in SAN format.
        return "b2b3";
    }

    /**
     * Pretty formats an FEN string to a human readable string.
     *
     * For more information on FEN (Forsyth-Edwards Notation) strings see:
     * https://wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
     */
    private printPrettyFEN() {
        // split the FEN string up to help parse it
        const split = this.game.fen.split(" ");
        const first = split[0]; // the first part is always the board locations

        const sideToMove = split[1]; // always the second part for side to move
        const usOrThem = sideToMove === this.player.color[0] ? "us"  : "them";

        const fullmove = split[5]; // always the sixth part for the full move

        const lines = first.split("/");
        const strings = [`Move: ${fullmove}\nSide to move: ${sideToMove} (${usOrThem})\n   +-----------------+`];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            strings.push(`\n ${8 - i} |`);
            for (const char of line) {
                const charAsNumber = Number(char);
                if (isNaN(charAsNumber)) {
                    strings.push(` ${char}`);
                } else { // it is a number, so that many blank lines
                    for (let j = 0; j < charAsNumber; j++) {
                        strings.push(" .");
                    }
                }
            }
            strings.push(" |");
        }
        strings.push("\n   +-----------------+\n     a b c d e f g h\n");

        // tslint:disable-next-line:no-console
        console.log(strings.join(""));
    }
}
