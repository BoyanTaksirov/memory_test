import { ACTIONS } from "./constants";

export const CELL_GUESSED_ACTION = (index, guessScore) =>
{
    return (
        {
            type: ACTIONS.CELL_GUESSED,
            index: index,
            guessScore: guessScore,
        }
    )
}

export const CELL_ERROR_ACTION = (index, errors) =>
{
    return (
        {
            type: ACTIONS.CELL_ERROR,
            index: index,
            errors: errors
        }
    )
}

export const INITIATE_NEW_LEVEL_ACTION = (gameData) =>
{
    return (
        {
            type: ACTIONS.INITIATE_NEW_LEVEL,
            gameData: gameData,
        }
    )
}

export const START_LEVEL_ACTION = () =>
{
    return (
        {
            type: ACTIONS.START_LEVEL,
        }
    )
}

export const SWITCH_PRE_REMEMBER_PHASE_ACTION = (gameData) =>
{
    return (
        {
            type: ACTIONS.SWITCH_PRE_REMEMBER_PHASE,
            gameData: gameData,
        }
    )
}

export const SWITCH_REMEMBER_PHASE_ACTION = (timeSec) =>
{
    return (
        {
            type: ACTIONS.SWITCH_REMEMBER_PHASE,
            time: timeSec,
        }
    )
}

//---------------------------end game cases----------------------

export const END_GAME_LEVEL_UP_ACTION = (newLevel, maxLevel) =>
{
    return (
        {
            type: ACTIONS.END_GAME_LEVEL_UP,
            level: newLevel,
            maxLevel: maxLevel,
        }
    )
}

export const END_GAME_ERROR_ACTION = (currentErrors, level) =>
{
    return (
        {
            type: ACTIONS.END_GAME_ERROR,
            currentErrors: currentErrors,
            level: level,
        }
    )
}

export const END_GAME_TIMEOUT_ACTION = (timeSec) =>
{
    return (
        {
            type: ACTIONS.END_GAME_TIMEOUT,
            time: timeSec,
        }
    )
}

export const END_GAME_CANCEL_ACTION = () =>
{
    return (
        {
            type: ACTIONS.END_GAME_CANCEL,
        }
    )
}

export const END_GAME_LAST_LEVEL_ACTION = (level) =>
{
    return (
        {
            type: ACTIONS.END_GAME_LAST_LEVEL,
            level: level,
        }
    )
}

//--------------------------------------end end game cases---------------------------

export const SHOW_BEGIN_SCREEN_ACTION = (level, maxLevel) =>
{
    return (
        {
            type: ACTIONS.SHOW_BEGIN_SCREEN,
            level: level,
            maxLevel: maxLevel,
        }
    )
}

export const SHOW_WIN_SCREEN_ACTION = () =>
{
    return (
        {
            type: ACTIONS.SHOW_WIN_SCREEN,
        }
    )
}

export const TIME_TICK_SECONDS_ACTION = (timeString) =>
{
    return (
        {
            type: ACTIONS.TIME_TICK_SECONDS,
            time: timeString
        }
    )
}

export const CHANGE_LEVEL_ACTION = (level) =>
{
    return (
        {
            type: ACTIONS.CHANGE_LEVEL,
            level: level,
        }
    )
}

export const SHOW_LEVEL_MENU_ACTION = () =>
{
    return (
        {
            type: ACTIONS.SHOW_LEVEL_MENU,
        }
    )
}

export const HIDE_LEVEL_MENU_ACTION = () =>
{
    return (
        {
            type: ACTIONS.HIDE_LEVEL_MENU,
        }
    )
}

export const UPDATE_LEVEL_ACTION = (level) =>
{
    return (
        {
            type: ACTIONS.UPDATE_LEVEL,
            level: level,
        }
    )
}

export const UPDATE_MAX_LEVEL_ACTION = (maxLevel) =>
{
    return (
        {
            type: ACTIONS.UPDATE_MAX_LEVEL,
            maxLevel: maxLevel,
        }
    )
}
