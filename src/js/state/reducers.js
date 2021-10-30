import { ACTIONS, SCREENS, initialGameState, GAME_STATUS, CELL_TYPES, CELL_STATES, MAX_ERRORS } from "./constants";

export const changeGameState = (state = {}, action) =>
{
    switch (action.type)
    {
        case ACTIONS.INITIATE_NEW_LEVEL:
            return {
                screen: SCREENS.GAME_SCREEN,
                gameLevel: action.gameData.level,
                maxLevel: action.gameData.maxLevel,
                score: action.gameData.score,
                levelData: action.gameData.levelData,
                game: {
                    time: action.gameData.time,
                    lastGuessTimestamp: action.gameData.lastGuessTimestamp,
                    allCells: action.gameData.allCells,
                    gameStatus: action.gameData.gameStatus,
                    errors: action.gameData.errors,
                    cancelled: action.gameData.cancelled,
                    clickedIndex: action.gameData.clickedIndex,
                }
            };

        case ACTIONS.SHOW_BEGIN_SCREEN:
            return {
                ...initialGameState,
                gameLevel: action.level,
                maxLevel: action.maxLevel,
            }

        case ACTIONS.START_LEVEL:
            return {
                ...state,
                game: {
                    ...state.game,
                    gameStatus: GAME_STATUS.STATUS_RUNNING_MEMORIZE
                }
            }

        case ACTIONS.SWITCH_PRE_REMEMBER_PHASE:
            return {
                ...state,
                game: {
                    ...state.game,
                    gameStatus: GAME_STATUS.STATUS_PRE_REMEMBER,
                    time: action.time,
                }
            }

        case ACTIONS.SWITCH_REMEMBER_PHASE:
            return {
                ...state,
                game: {
                    ...state.game,
                    gameStatus: GAME_STATUS.STATUS_RUNNING_REMEMBER,
                    time: action.time,
                }
            }

        case ACTIONS.TIME_TICK_SECONDS:
            return {
                ...state,
                game: {
                    ...state.game,
                    time: action.time
                }
            };

        case ACTIONS.CELL_GUESSED:
            var newCells = [];
            var cellData = state.game.allCells;
            for (var n = 0; n < cellData.length; n++)
            {
                newCells[n] = [];
                for (let i = 0; i < cellData[n].length; i++)
                {
                    newCells[n][i] = cellData[n][i];

                    if (action.index == cellData[n][i].cellIndex && cellData[n][i].cellType == CELL_TYPES.FULL &&
                        cellData[n][i].cellState == CELL_STATES.CLOSED)
                    {
                        newCells[n][i].cellState = CELL_STATES.OPENED;
                    }
                }
            }

            return {
                ...state,
                score: state.score + action.guessScore,
                game: {
                    ...state.game,
                    allCells: newCells,
                    clickedIndex: action.index,
                    lastGuessTimestamp: state.game.time,
                }
            };

        case ACTIONS.END_GAME_LEVEL_UP:
            return {
                ...state,
                gameLevel: action.level,
                maxLevel: action.maxLevel,
                game: {
                    ...state.game,
                    gameStatus: GAME_STATUS.STATUS_ENDED_LEVEL_UP,
                }
            }

        case ACTIONS.CELL_ERROR:
            var newCells = [];
            var cellsData = state.game.allCells;
            for (var n = 0; n < cellsData.length; n++)
            {
                newCells[n] = [];
                for (let i = 0; i < cellsData[n].length; i++)
                {
                    newCells[n][i] = cellsData[n][i];

                    if (action.index == cellsData[n][i].cellIndex && cellsData[n][i].cellType == CELL_TYPES.EMPTY &&
                        cellsData[n][i].cellState == CELL_STATES.CLOSED)
                    {
                        newCells[n][i].cellState = CELL_STATES.OPENED;
                    }
                }
            }

            return {
                ...state,
                game: {
                    ...state.game,
                    allCells: newCells,
                    errors: action.errors,
                    clickedIndex: action.index,
                }
            };


        case ACTIONS.END_GAME_ERROR:
            return {
                ...state,
                gameLevel: action.level,
                game: {
                    ...state.game,
                    gameStatus: GAME_STATUS.STATUS_ENDED_ERROR,
                }
            }

        case ACTIONS.END_GAME_TIMEOUT:
            return {
                ...state,
                game: {
                    ...state.game,
                    gameStatus: GAME_STATUS.STATUS_ENDED_TIMEOUT,
                }
            }

        case ACTIONS.END_GAME_CANCEL:
            return {
                ...state,
                game: {
                    ...state.game,
                    cancelled: true,
                }
            }

        case ACTIONS.SHOW_LEVEL_MENU:
            return {
                ...state,
                levelMenuOn: true,
            }

        case ACTIONS.HIDE_LEVEL_MENU:
            return {
                ...state,
                levelMenuOn: false,
            }

        case ACTIONS.CHANGE_LEVEL:
            return {
                ...state,
                gameLevel: action.level,
                levelMenuOn: false,
            }

        case ACTIONS.SHOW_WIN_SCREEN:
            return {
                ...state,
                screen: SCREENS.WIN_SCREEN,
            }

        case ACTIONS.END_GAME_LAST_LEVEL:
            return {
                ...state,
                gameLevel: action.level,
                game: {
                    ...state.game,
                    gameStatus: GAME_STATUS.STATUS_ENDED_LAST_LEVEL,
                }
            }

        case ACTIONS.UPDATE_MAX_LEVEL:
            return {
                ...state,
                maxLevel: action.maxLevel,
            }

        case ACTIONS.UPDATE_LEVEL:
            return {
                ...state,
                gameLevel: action.level,
            }

        default:
            return state;
    }
}
