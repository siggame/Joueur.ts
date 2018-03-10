// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify it.
// Instead, you should only be reading its variables and calling its functions.

import { GameObject } from "./game-object";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A resource spawner that generates branches or food.
 */
export class Spawner extends GameObject {

    /**
     * True if this Spawner has been harvested this turn, and it will not heal
     * at the end of the turn, false otherwise.
     */
    public readonly hasBeenHarvested!: boolean;

    /**
     * How much health this Spawner has, which is used to calculate how much of
     * its resource can be harvested.
     */
    public readonly health!: number;

    /**
     * The Tile this Spawner is on.
     */
    public readonly tile!: Tile | undefined;

    /**
     * What type of resource this is ('food' or 'branches').
     */
    public readonly type!: string;


    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add to this class can be preserved here
    // <<-- /Creer-Merge: functions -->>
}
