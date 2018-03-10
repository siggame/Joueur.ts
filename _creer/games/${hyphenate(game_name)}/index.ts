// DO NOT MODIFY THIS FILE

import { IGameNamespace } from "../../joueur/interfaces";
import { AI } from "./AI";
import { Game } from "./game";

% for game_obj_key in sort_dict_keys(game_objs):
import { ${game_obj_key} } from "./${hyphenate(game_obj_key)}";
% endfor

/**
 * This is a collection of all the classes that ${game_name} uses to work.
 */
export const namespace: IGameNamespace = {
    AI,
    Game,
    GameObjectClasses: {
% for game_obj_key in sort_dict_keys(game_objs):
      ${game_obj_key},
% endfor
    },
};
