import chalk from "chalk";
import { BaseGame } from "./base-game";
import { IBasePlayer } from "./interfaces";

export function setAISettings(ai: BaseAI, aiSettings: string) {
  if (aiSettings) {
    const settings = aiSettings.split("&");
    for (const setting of settings) {
      const kv = setting.split("=");
      (ai as any).settings[kv[0]] = kv[1]; // cast to any to use private field
    }
  }
}

// @class BaseAI: the base functions all AIs should do
export class BaseAI {
  public static getName(): string {
     // Intended to be overridden by the AI class
    return "JavaScript Player";
  }

  public readonly game!: BaseGame;
  public readonly player!: IBasePlayer;

  // will be set by the setAISettings function above
  private settings: { [key: string]: string | undefined } = {};

  public constructor(game: BaseGame) {
    this.game = game;
  }

  public async start(): Promise<void> {
    // Intended to be overridden by the AI class
  }

  public async gameUpdated(): Promise<void> {
    // Intended to be overridden by the AI class
  }

  public async invalid(message: string): Promise<void> {
    // tslint:disable-next-line:no-console
    console.warn(chalk.yellow(`Invalid: ${message}`));
  }

  public async ended(won: boolean, reason: string): Promise<void> {
    // Intended to be overridden by the AI class
  }

  /**
   * Gets an AI setting passed to the program via the `--aiSettings` flag. If the flag was set it will be returned as a string value, undefined otherwise.
   *
   * @param {string} key - The key of the setting you wish to get the value for
   * @returns {string|undefined} A string representing the value set via command line, or undefined if the key was not set
   */
  public getSetting(key: string): string | undefined {
    return this.settings[key];
  }
}
