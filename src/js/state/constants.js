export const ASSETS_DATA = [
    { name: "win", path: "./assets/win2.png" },
    { name: "show", path: "./assets/uncheck.png" },
    { name: "check", path: "./assets/check.png" },
    { name: "unguess", path: "./assets/unguess.png" },
    { name: "error", path: "./assets/x2.png" },
    { name: "splash", path: "./assets/splash.png" },
    { name: "exit", path: "./assets/exit.png" },
    { name: "sound_click", path: "./assets/click.wav" },
]

export var IMAGES_DATA = {};
export var SOUNDS ={};


export const SCREENS = {
    BEGIN_SCREEN: "BEGIN_SCREEN",
    GAME_SCREEN: "GAME_SCREEN",
    WIN_SCREEN: "WIN_SCREEN"
}

export const CELL_TYPES = {
    EMPTY: "EMPTY",
    FULL: "FULL",
}

export const CELL_STATES = {
    OPENED: "OPENED",
    CLOSED: "CLOSED",
}

export const CELL_VISUAL_STATES = {
    COVERED: "COVERED",
    SHOW: "SHOW",
    GUESSED: "GUESSED",
    UNGUESSED: "UNGUESSED",
    ERROR: "ERROR"
}

export const ACTIONS = {
    START_LEVEL: "START_LEVEL",
    SWITCH_PRE_REMEMBER_PHASE: "SWITCH_PRE_REMEMBER_PHASE",
    SWITCH_REMEMBER_PHASE: "SWITCH_REMEMBER_PHASE",

    HIDE_LEVEL_MENU: "HIDE_LEVEL_MENU",
    SHOW_LEVEL_MENU: "SHOW_LEVEL_MENU",
    CHANGE_LEVEL: "CHANGE_LEVEL",

    CELL_GUESSED: "CELL_GUESSED",
    CELL_ERROR: "CELL_ERROR",

    TIME_TICK_SECONDS: "TIME_TICK_SECONDS",

    SHOW_BEGIN_SCREEN: "SHOW_BEGIN_SCREEN",
    INITIATE_NEW_LEVEL: "INITIATE_NEW_LEVEL",
    SHOW_WIN_SCREEN: "SHOW_WIN_SCREEN",

    END_GAME_LEVEL_UP: "END_GAME_LEVEL_UP",
    END_GAME_LAST_LEVEL: "END_GAME_LAST_LEVEL",
    END_GAME_TIMEOUT: "END_GAME_TIMEOUT",
    END_GAME_ERROR: "END_GAME_ERROR",
    END_GAME_CANCEL: "END_GAME_CANCEL",

    UPDATE_LEVEL: "UPDATE_LEVEL",
    UPDATE_MAX_LEVEL: "UPDATE_MAX_LEVEL",
}

export const GAME_STATUS = {
    STATUS_PRE_MEMORIZE: "STATUS_PRE_MEMORIZE",
    STATUS_RUNNING_MEMORIZE: "STATUS_RUNNING_MEMORIZE",
    STATUS_PRE_REMEMBER: "STATUS_PRE_REMEMBER",
    STATUS_RUNNING_REMEMBER: "STATUS_RUNNING_REMEMBER",
    STATUS_ENDED_LEVEL_UP: "STATUS_ENDED_LEVEL_UP",
    STATUS_ENDED_TIMEOUT: "STATUS_ENDED_TIMEOUT",
    STATUS_ENDED_ERROR: "STATUS_ENDED_ERROR",
    STATUS_ENDED_LAST_LEVEL: "STATUS_ENDED_LAST_LEVEL",
}

export const GRID_LEVELS = [
    { w: 4, h: 4, c: 2, timeM: 5, timeR: 15 },
    { w: 4, h: 4, c: 3, timeM: 5, timeR: 15 },
    { w: 4, h: 4, c: 4, timeM: 5, timeR: 15 },
    { w: 4, h: 4, c: 5, timeM: 7, timeR: 15 },
    { w: 4, h: 4, c: 6, timeM: 7, timeR: 15 },

    { w: 5, h: 5, c: 4, timeM: 10, timeR: 15 },
    { w: 5, h: 5, c: 5, timeM: 10, timeR: 15 },
    { w: 5, h: 5, c: 6, timeM: 10, timeR: 15 },
    { w: 5, h: 5, c: 7, timeM: 10, timeR: 15 },
    { w: 5, h: 5, c: 8, timeM: 10, timeR: 15 },

    { w: 5, h: 5, c: 5, timeM: 7, timeR: 15 },
    { w: 5, h: 5, c: 6, timeM: 7, timeR: 15 },
    { w: 5, h: 5, c: 7, timeM: 7, timeR: 15 },
    { w: 5, h: 5, c: 8, timeM: 7, timeR: 15 },
    { w: 5, h: 5, c: 9, timeM: 7, timeR: 15 },

    { w: 6, h: 6, c: 4, timeM: 10, timeR: 15 },
    { w: 6, h: 6, c: 5, timeM: 10, timeR: 15 },
    { w: 6, h: 6, c: 6, timeM: 10, timeR: 15 },
    { w: 6, h: 6, c: 7, timeM: 10, timeR: 15 },
    { w: 6, h: 6, c: 8, timeM: 10, timeR: 15 },

    { w: 7, h: 7, c: 5, timeM: 10, timeR: 15 },
    { w: 7, h: 7, c: 6, timeM: 10, timeR: 15 },
    { w: 7, h: 7, c: 7, timeM: 10, timeR: 15 },
    { w: 7, h: 7, c: 8, timeM: 10, timeR: 15 },
    { w: 7, h: 7, c: 9, timeM: 10, timeR: 15 },

    { w: 7, h: 7, c: 6, timeM: 8, timeR: 15 },
    { w: 7, h: 7, c: 7, timeM: 8, timeR: 15 },
    { w: 7, h: 7, c: 8, timeM: 8, timeR: 15 },
    { w: 7, h: 7, c: 9, timeM: 8, timeR: 15 },
    { w: 7, h: 7, c: 10, timeM: 8, timeR: 15 },

    { w: 7, h: 7, c: 7, timeM: 7, timeR: 15 },
    { w: 7, h: 7, c: 8, timeM: 7, timeR: 15 },
    { w: 7, h: 7, c: 9, timeM: 7, timeR: 15 },
    { w: 7, h: 7, c: 10, timeM: 7, timeR: 15 },
    { w: 7, h: 7, c: 11, timeM: 7, timeR: 15 },

    { w: 8, h: 8, c: 5, timeM: 10, timeR: 15 },
    { w: 8, h: 8, c: 6, timeM: 10, timeR: 15 },
    { w: 8, h: 8, c: 7, timeM: 10, timeR: 15 },
    { w: 8, h: 8, c: 8, timeM: 10, timeR: 15 },
    { w: 8, h: 8, c: 9, timeM: 10, timeR: 15 },

    { w: 9, h: 9, c: 6, timeM: 10, timeR: 15 },
    { w: 9, h: 9, c: 7, timeM: 10, timeR: 15 },
    { w: 9, h: 9, c: 8, timeM: 10, timeR: 15 },
    { w: 9, h: 9, c: 9, timeM: 12, timeR: 15 },
    { w: 9, h: 9, c: 10, timeM: 12, timeR: 15 },
]

/*export const GRID_LEVELS = [
    { w: 4, h: 4, c: 4, timeM: 10, timeR: 15 },
    { w: 4, h: 4, c: 5, timeM: 10, timeR: 15 },
]*/

export const BASE_POINTS_PER_GUESS = 100;

export const PRE_REM_MODE_DURATION_SEC = 0.5;

export const MAX_ERRORS = 0;

export const CC_THRES_1 = 70;
export const CC_THRES_2 = 30;

export const COLOR_1 = "rgb(108, 205, 40)";
export const COLOR_2 = "rgb(255, 196, 0)";
export const COLOR_3 = "rgb(255, 8, 0)";

export const LEVEL_GROUP_SIZE = 5;

export var initialGameState = {
    screen: SCREENS.BEGIN_SCREEN,
    levelMenuOn: false,
    gameLevel: 0,
    maxLevel: 0,
    levelData: null,
    score: 0,
    game: {
        time: 0,
        lastGuessTimestamp: 0,
        allCells: null,
        gameStatus: null,
        errors: 0,
        cancelled: false,
        clickedIndex: null,
    }
}



//----------------------------------TEXTS----------------------------------------
export const TEXTS = {
    Start: "Start",
    Skip: "Skip",
    Cancel: "Cancel",
    Starting: "Starting...",
    Select_Level: "Select Level: ",
    When_ready: "Press start and try to memorize the cells.",
    Try_to_memorize: "Try to memorize green cells. Time left: ",
    Click_on_green_cells: "Click on green cells locations. Time left: ",
    Time_up: "Time up!",
    Time_stopped: "Time stopped!",
    Continue: "Continue",
}

