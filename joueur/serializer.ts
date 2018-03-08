// Functions to serialize and un-serialize json communications strings

import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";

// tslint:disable:only-arrow-functions only-arrow-functions
export type SomeSerializableTypes = ISerializableObject | string | number | undefined | boolean;
export type SerializableTypes = SomeSerializableTypes | SomeSerializableTypes[];
export interface ISerializableObject { [key: string]: SerializableTypes; }
// tslint:disable-next-line:no-any
interface IAnyObject { [key: string]: any; }

export interface IGameObjectReference { id: string; }

export function isEmpty(obj: object): obj is {} {
    return (Object.getOwnPropertyNames(obj).length === 0);
}

export function isEmptyExceptFor(obj: object, key: string): boolean {
    return (isObject(obj)
        && Object.getOwnPropertyNames(obj).length === 1 && obj[key] !== undefined
    );
  }

export function isGameObjectReference(obj: object): obj is IGameObjectReference {
    return isEmptyExceptFor(obj, "id");
}

// tslint:disable-next-line:no-any
export function isObject(obj: any): obj is { [key: string]: any } {
    return (typeof(obj) === "object" && obj !== null);
}

export function isSerializable(obj: object, key: string): boolean {
    return isObject(obj)
        && obj.hasOwnProperty(key)
        && !String(key)
            .startsWith("_");
}

export function serialize(data: SerializableTypes): SerializableTypes {
    if (!isObject(data)) {
      // Then no need to serialize it
      // As it"s already json serializable primitive such as a string, number, boolean, null, etc.
      return data;
    }

    if (data instanceof BaseGameObject) {
      // No need to serialize this whole thing, send an object reference
      return { id: data.id };
    }

    const serialized: IAnyObject = Array.isArray(data) ? [] : {};
    for (const [key, value] of Object.entries(data)) {
      if (isSerializable(data, key)) {
        serialized[key] = serialize(value);
      }
    }

    return serialized;
  }

// tslint:disable-next-line:no-any
export function deSerialize(data: any, game: BaseGame): any {
    if (!isObject(data)) {
      return data;
    }

    if (isGameObjectReference(data)) {
      // It's a tracked game object
      return game.gameObjects[data.id];
    }

    const result: IAnyObject = Array.isArray(data) ? [] : {};

    for (const [key, value] of Object.entries(data)) {
      result[key] = (typeof(value) === "object")
        ? deSerialize(value, game)
        : value;
    }

    return result;
}
