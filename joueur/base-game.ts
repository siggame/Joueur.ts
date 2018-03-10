import { BaseGameObject } from "./base-game-object";

/*
 * The basics of any game, basically state management. Competitors do not modify
 */
export class BaseGame {
  /**
   * All the game objects in the game, indexed by their game object ID.
   */
  public readonly gameObjects: {
    [id: string]: BaseGameObject | undefined;
  } = {};
}
