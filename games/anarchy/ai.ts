// This is where you build your AI for the Anarchy game.

import { BaseAI } from "../../joueur/base-ai";
import { Game } from "./game";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be required here safely between creer runs
import { Building } from "./building";
// <<-- /Creer-Merge: imports -->>

/**
 * This is the class to play the Anarchy game.
 * This is where you should build your AI.
 */
export class AI extends BaseAI {
    /**
     * This is the name you send to the server so your AI will control the player named this string.
     */
    public static getName(): string {
        // <<-- Creer-Merge: getName -->>
        return "Anarchy JavaScript Player";
        // <<-- /Creer-Merge: getName -->>
    }

    /**
     * The reference to the Game instance this AI is playing.
     */
    public readonly game!: Game;

    /**
     * The reference to the Player this AI controls in the Game.
     */
    public readonly player!: Player;

    /**
     * This is called once the game starts and your AI knows its playerID and game. You can initialize your AI here.
     */
    public async start(): Promise<void> {
        // <<-- Creer-Merge: start -->>
        // pass
        // <<-- /Creer-Merge: start -->>
    }

    /**
     * This is called every time the game's state updates, so if you are tracking anything you can update it here.
     */
    public async gameUpdated(): Promise<void> {
        // <<-- Creer-Merge: gameUpdated -->>
        // pass
        // <<-- /Creer-Merge: gameUpdated -->>
    }

    /**
     * This is called when the game ends, you can clean up your data and dump files here if need be.
     *
     * @param won True means you won, false means you lost.
     * @param reason The human readable string explaining why you won or lost.
     */
    public async ended(won: boolean, reason: string): Promise<void> {
        // <<-- Creer-Merge: ended -->>
        // pass
        // <<-- /Creer-Merge: ended -->>
    }
    /**
     * This is called every time it is this AI.player's turn.
     * @returns Represents if you want to end your turn. True means end your
     * turn, False means to keep your turn going and re-call this function.
     */
    public async runTurn(): Promise<boolean> {
        // <<-- Creer-Merge: runTurn -->>
        // Put your game logic here for runTurn
        // <<-- Creer-Merge: runTurn -->>
        // Get my first warehouse
        console.log("current turn", this.game.currentTurn);
        const warehouse = this.player.warehouses[0];
        if (this.canBribe(warehouse)) {
            // ignite the first enemy building
            await warehouse.ignite(this.player.opponent!.buildings[0]);
        }

        // Get my first fire department
        const fireDepartment = this.player.fireDepartments[0];
        if (this.canBribe(fireDepartment)) {
            // extinguish my first building if it's not my headquarters
            const myBuilding = this.player.buildings[0];
            if (!myBuilding.isHeadquarters) {
                await fireDepartment.extinguish(myBuilding);
            }
        }

        // Get my first police department
        const policeDepartment = this.player.policeDepartments[0];
        if (this.canBribe(policeDepartment)) {
            // Get the first enemy warehouse
            const toRaid = this.player.opponent!.warehouses[0];
            // Make sure it is alive to be raided
            if (toRaid.health > 0 && !toRaid.isHeadquarters) {
                // Raid the first enemy warehouse if it's alive and not a headquarters
                await policeDepartment.raid(toRaid);
            }
        }

        // Get my first weather station
        const weatherStation1 = this.player.weatherStations[0];
        if (this.canBribe(weatherStation1)) {
            // Make sure the intensity isn't at max
            if (this.game.nextForecast) {
                if (this.game.nextForecast.intensity < this.game.maxForecastIntensity) {
                    await weatherStation1.intensify();
                }
                else {
                    // Otherwise decrease the intensity
                    await weatherStation1.intensify(true);
                }
            }
        }

        // Get my second weather station
        const weatherStation2 = this.player.weatherStations[1];
        if (this.canBribe(weatherStation2)) {
            // Rotate clockwise
            await weatherStation2.rotate();
        }

        return true;
        // <<-- /Creer-Merge: runTurn -->>
    }

    // <<-- Creer-Merge: functions -->>
    // any additional functions you want to add for your AI
    /**
     * checks if this AI can bribe a building. This is an example function. you are free to remove/modify.
     *
     * @memberof AI
     */
    private canBribe(building: Building): boolean {
        return(building
            && building.health > 0
            && !building.bribed
            && building.owner === this.player
        );
    }
    // <<-- /Creer-Merge: functions -->>
}
