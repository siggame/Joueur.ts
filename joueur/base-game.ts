import { BaseGameObject } from "./base-game-object";

/*
 * The basics of any game, basically state management. Competitors do not modify
 */
export class BaseGame {
  public readonly gameObjects: {
    [id: string]: BaseGameObject | undefined;
  } = {};
}
