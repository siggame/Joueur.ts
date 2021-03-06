// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

/* tslint:disable */
// This is code written by a computer, it might be funky.
// (though we will try to make it readable to humans)

import { GameObject } from "./game-object";
import { Tile } from "./tile";
import { Tower } from "./tower";
import { Unit } from "./unit";

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
     * The amount of gold this Player has.
     */
    public readonly gold!: number;

    /**
     * The amount of health remaining for this player's main unit.
     */
    public readonly health!: number;

    /**
     * The tile that the home base is located on.
     */
    public readonly homeBase!: Tile[];

    /**
     * If the player lost the game or not.
     */
    public readonly lost!: boolean;

    /**
     * The amount of mana this player has.
     */
    public readonly mana!: number;

    /**
     * The name of the player.
     */
    public readonly name!: string;

    /**
     * This player's opponent in the game.
     */
    public readonly opponent!: Player;

    /**
     * The reason why the player lost the game.
     */
    public readonly reasonLost!: string;

    /**
     * The reason why the player won the game.
     */
    public readonly reasonWon!: string;

    /**
     * All tiles that this player can build on and move workers on.
     */
    public readonly side!: Tile[];

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    public readonly timeRemaining!: number;

    /**
     * Every Tower owned by this player.
     */
    public readonly towers!: Tower[];

    /**
     * Every Unit owned by this Player.
     */
    public readonly units!: Unit[];

    /**
     * If the player won the game or not.
     */
    public readonly won!: boolean;

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
