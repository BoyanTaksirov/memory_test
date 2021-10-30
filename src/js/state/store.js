import { createStore, combineReducers } from "redux";
import { initialGameState } from "./constants";
import { changeScreen, changeGameState } from "./reducers";

export const GAME_STORE = createStore(changeGameState, initialGameState);