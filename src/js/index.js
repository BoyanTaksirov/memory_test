import { render } from "react-dom";
import React from "react";
import GameView from "./view/game_view";
import { GAME_STORE } from "./state/store";
import Clock from "./utils/clock";
import { PreloaderBlock } from "./loaders/preloader_block";
import { MultiLoader } from "./loaders/multiloader";
import
{
    MAX_ERRORS, SCREENS, GAME_STATUS, GRID_LEVELS, CELL_TYPES, CELL_STATES, PRE_REM_MODE_DURATION_SEC, BASE_POINTS_PER_GUESS, LEVEL_GROUP_SIZE,
    ASSETS_DATA, IMAGES_DATA, SOUNDS
} from "./state/constants";

import
{
    CELL_GUESSED_ACTION, CELL_ERROR_ACTION, INITIATE_NEW_LEVEL_ACTION, START_LEVEL_ACTION, END_GAME_LEVEL_UP_ACTION,
    END_GAME_ERROR_ACTION, SHOW_BEGIN_SCREEN_ACTION, SHOW_WIN_SCREEN_ACTION, TIME_TICK_SECONDS_ACTION, END_GAME_CANCEL_ACTION, SWITCH_PRE_REMEMBER_PHASE_ACTION,
    SWITCH_REMEMBER_PHASE_ACTION, END_GAME_TIMEOUT_ACTION, CHANGE_LEVEL_ACTION, SHOW_LEVEL_MENU_ACTION, HIDE_LEVEL_MENU_ACTION,
    END_GAME_LAST_LEVEL_ACTION, UPDATE_LEVEL_ACTION, UPDATE_MAX_LEVEL_ACTION
} from "./state/actions";

import "../styles/preloader.css";
import "../styles/styles.css";


var startHandle;
var preRemHandle;
var gameClock;

var unsubscribeClickAnalyze;
var unsubscribePreRemCallback;
var unsubscribeRemCallback;

//-----------------------------------assets loading--------------------------------

var initialSize = { width: window.innerWidth, height: window.innerHeight };
var preloader = new PreloaderBlock(document.body, initialSize);
preloader.setZIndex(101);
preloader.addToContainer();

var multiloader = new MultiLoader(onAssetsLoaded, onAssetsProgress);
multiloader.setData(ASSETS_DATA);
multiloader.startLoading();

//------------------------------------------------------------------------------------

function onAssetsProgress(progress)
{
    preloader.updatePreloader(progress)
}

function onAssetsLoaded(resources)
{
    for (var i = 0; i < resources.length; i++)
    {
        if (resources[i].name.includes("sound"))
        {
            let tempSound = createSound(resources[i].objectURL);
            tempSound.volume = 0.7;
            SOUNDS[resources[i].name] = tempSound;
        }
        else
        {
            IMAGES_DATA[resources[i].name] = resources[i].objectURL;
        }
    }

    setup();
    initialRender();
}

//--------------------------------------------------------------------------------

function setup()
{
    gameClock = new Clock(1000);
    gameClock.addCallbacks([onTick]);

    window.onresize = renderApp;

    updateLevelAndMaxLevel();

    GAME_STORE.subscribe(renderApp);
}

function updateLevelAndMaxLevel()
{
    var maxLevel = retrieveMaxLevel();

    GAME_STORE.dispatch(UPDATE_MAX_LEVEL_ACTION(maxLevel));

    var level = retrieveLevel();

    GAME_STORE.dispatch(UPDATE_LEVEL_ACTION(level));
}

function retrieveMaxLevel()
{
    var maxLevelValue = window.localStorage.getItem("maxLevel");
    if (maxLevelValue)
    {
        return Number(maxLevelValue);
    }
    else
    {
        return 0;
    }
}

function retrieveLevel()
{
    var level = window.localStorage.getItem("level");
    if (level)
    {
        return Number(level);
    }
    else
    {
        return 0;
    }
}

function initialRender()
{
    if (startHandle)
    {
        clearTimeout(startHandle);
        startHandle = null;
    }

    var container = document.getElementById("ReactContainer");
    if (!container)
    {
        startHandle = setTimeout(initialRender, 500);
        return;
    }

    container.className = "full";

    renderApp();

    if (preloader)
    {
        preloader.removePreloader();
        preloader = null;
    }
}

function renderApp()
{
    let callbacks = {
        onCellClicked: onCellClicked,
        onGameButtonClicked: onGameButtonClicked,
        onStartGameClicked: onStartGameClicked,
        onLevelClicked: onLevelClicked,
        onSelectLevelClicked: onSelectLevelClicked,
        hideLevelMenu: hideLevelMenu,
        showBeginScreen: showBeginScreen,
        resetToBeginScreen: resetToBeginScreen,
    }

    let gameState = GAME_STORE.getState();
    render(<GameView state={gameState} callbacks={callbacks} />, document.getElementById("ReactContainer"));
}


//----------------------------------------------callbacks------------------------------------------------------------------

function onStartGameClicked() 
{
    var gameState = GAME_STORE.getState();
    if (gameState.screen != SCREENS.BEGIN_SCREEN)
    {
        return;
    }

    SOUNDS.sound_click.play();

    let newGameData = getNewGameData(gameState.gameLevel, gameState.maxLevel, 0);
    GAME_STORE.dispatch(INITIATE_NEW_LEVEL_ACTION(newGameData));
}


function onCellClicked(index) 
{
    var gameState = GAME_STORE.getState();
    if (gameState.screen != SCREENS.GAME_SCREEN || gameState.game.gameStatus != GAME_STATUS.STATUS_RUNNING_REMEMBER)
    {
        return;
    }

    SOUNDS.sound_click.play();

    unsubscribeClickAnalyze = GAME_STORE.subscribe(analyzeCellClickResult);

    let match = checkForMatch(index, gameState);
    if (match)
    {
        var timeFromLastGuess = gameState.game.time - gameState.game.lastGuessTimestamp;
        var guessScore = Math.round(BASE_POINTS_PER_GUESS / (timeFromLastGuess + 1));
        //console.log("BASE_POINTS_PER_GUESS: " + BASE_POINTS_PER_GUESS);

        GAME_STORE.dispatch(CELL_GUESSED_ACTION(index, guessScore));
    }
    else
    {
        var currentErrors = gameState.game.errors + 1;
        GAME_STORE.dispatch(CELL_ERROR_ACTION(index, currentErrors));
    }
}

function showBeginScreen()
{
    let level = GAME_STORE.getState().gameLevel;
    let maxLevel = GAME_STORE.getState().maxLevel;
    GAME_STORE.dispatch(SHOW_BEGIN_SCREEN_ACTION(level, maxLevel));
}

function resetToBeginScreen()
{
    clearInterval(preRemHandle);
    gameClock.reset();
    showBeginScreen();
}

function showWinScreen()
{
    gameClock.reset();
    GAME_STORE.dispatch(SHOW_WIN_SCREEN_ACTION());
}

function onGameButtonClicked() 
{
    if (GAME_STORE.getState().game.cancelled)
    {
        showBeginScreen();
        return;
    }

    SOUNDS.sound_click.play();

    var currentGameState = GAME_STORE.getState().game.gameStatus;

    switch (currentGameState)
    {
        case GAME_STATUS.STATUS_PRE_MEMORIZE:
            gameClock.start();
            GAME_STORE.dispatch(START_LEVEL_ACTION());
            break;

        case GAME_STATUS.STATUS_RUNNING_MEMORIZE:
            gameClock.start();
            activateRememberMode();
            break;

        case GAME_STATUS.STATUS_PRE_REMEMBER:
            //clearInterval(preRemHandle);
            //gameClock.pause();
            //GAME_STORE.dispatch(END_GAME_CANCEL_ACTION());
            break;

        case GAME_STATUS.STATUS_RUNNING_REMEMBER:
            //gameClock.pause();
            //GAME_STORE.dispatch(END_GAME_CANCEL_ACTION());
            break;

        case GAME_STATUS.STATUS_ENDED_ERROR:
            showBeginScreen();
            break;

        case GAME_STATUS.STATUS_ENDED_TIMEOUT:
            showBeginScreen();
            break;

        case GAME_STATUS.STATUS_ENDED_LEVEL_UP:
            let currentScore = GAME_STORE.getState().score;
            let newGameLevel = GAME_STORE.getState().gameLevel;
            let maxLevel = GAME_STORE.getState().maxLevel;
            let newGameData = getNewGameData(newGameLevel, maxLevel, currentScore);

            GAME_STORE.dispatch(INITIATE_NEW_LEVEL_ACTION(newGameData));
            break;

        case GAME_STATUS.STATUS_ENDED_LAST_LEVEL:
            showWinScreen();
            break;
    }
}

function onLevelClicked(level)
{
    SOUNDS.sound_click.play();

    GAME_STORE.dispatch(CHANGE_LEVEL_ACTION(level));
}

function onSelectLevelClicked(e)
{
    SOUNDS.sound_click.play();

    e.stopPropagation();
    let state = GAME_STORE.getState();
    if (state.levelMenuOn)
    {
        GAME_STORE.dispatch(HIDE_LEVEL_MENU_ACTION());
        return;
    }
    GAME_STORE.dispatch(SHOW_LEVEL_MENU_ACTION());
}

function hideLevelMenu()
{
    let state = GAME_STORE.getState();
    if (state.levelMenuOn)
    {
        GAME_STORE.dispatch(HIDE_LEVEL_MENU_ACTION());
    }
}

//---------------------------------------------end callbacks---------------------------------------------------------------------------

function analyzeCellClickResult()
{
    unsubscribeClickAnalyze();
    unsubscribeClickAnalyze = null;

    let gameState = GAME_STORE.getState();
    if (gameState.screen == SCREENS.GAME_SCREEN && gameState.game.gameStatus == GAME_STATUS.STATUS_RUNNING_REMEMBER)
    {
        if (checkIfLast(gameState))
        {
            gameClock.pause();
            let newLevel = gameState.gameLevel + 1;
            if (newLevel >= GRID_LEVELS.length)
            {
                GAME_STORE.dispatch(END_GAME_LAST_LEVEL_ACTION(0));
                return;
            }
            else
            {
                window.localStorage.setItem("level", String(newLevel));

                var maxLevel = gameState.maxLevel;
                if(!maxLevel)
                {
                    maxLevel = 0;
                }
                if (newLevel > maxLevel)
                {
                    window.localStorage.setItem("maxLevel", String(newLevel));
                    maxLevel = newLevel;
                }
                
                GAME_STORE.dispatch(END_GAME_LEVEL_UP_ACTION(newLevel, maxLevel));
            }
        }

        if (gameState.game.errors > MAX_ERRORS)
        {
            gameClock.pause();
            GAME_STORE.dispatch(END_GAME_ERROR_ACTION(gameState.game.errors, gameState.gameLevel));
        }
    }
}

function getNewGameData(level, maxLevel, score) 
{
    let allCells = initCells(level);
    return (
        {
            level: level,
            maxLevel: maxLevel,
            score: score,
            time: 0,
            lastGuessTimestamp: 0,
            allCells: allCells,
            gameStatus: GAME_STATUS.STATUS_PRE_MEMORIZE,
            errors: 0,
            levelData: GRID_LEVELS[level],
            cancelled: false,
            clickedIndex: null,
        }
    )
}

function onTick(timeSec) 
{
    var level = GAME_STORE.getState().gameLevel;
    var timeMode = GAME_STORE.getState().game.gameStatus;
    var timeLimit;
    if (timeMode == GAME_STATUS.STATUS_RUNNING_MEMORIZE)
    {
        timeLimit = GRID_LEVELS[level].timeM;
        if (timeSec >= timeLimit)
        {
            unsubscribePreRemCallback = GAME_STORE.subscribe(preRemCallback);
            gameClock.reset();
            GAME_STORE.dispatch(TIME_TICK_SECONDS_ACTION(timeSec));
            return;
        }
    }
    else if (timeMode == GAME_STATUS.STATUS_RUNNING_REMEMBER)
    {
        timeLimit = GRID_LEVELS[level].timeR;
        if (timeSec >= timeLimit)
        {
            gameClock.pause();  //stopping clock, game is over
            GAME_STORE.dispatch(END_GAME_TIMEOUT_ACTION(timeSec));
            return;
        }
    }

    GAME_STORE.dispatch(TIME_TICK_SECONDS_ACTION(timeSec));
}

function preRemCallback()
{
    unsubscribePreRemCallback();
    unsubscribePreRemCallback = null;

    unsubscribeRemCallback = GAME_STORE.subscribe(preActivateRememberMode);

    GAME_STORE.dispatch(SWITCH_PRE_REMEMBER_PHASE_ACTION());
}

function preActivateRememberMode()
{
    unsubscribeRemCallback();
    unsubscribeRemCallback = null;

    preRemHandle = setTimeout(activateRememberMode, PRE_REM_MODE_DURATION_SEC * 1000);
}

function activateRememberMode()
{
    GAME_STORE.dispatch(SWITCH_REMEMBER_PHASE_ACTION(0));
    gameClock.start();  //restarting clock for the new remembering mode
}

function initCells(level)
{
    let width = GRID_LEVELS[level].w;
    let height = GRID_LEVELS[level].h;

    let numTargetCells = GRID_LEVELS[level].c;

    let gridIndexes = [];
    let chosenIndexes = [];
    for (let i = 0; i < width * height; i++)
    {
        gridIndexes.push(i);
    }

    for (let i = 0; i < numTargetCells; i++)
    {
        let index = Math.floor(Math.random() * gridIndexes.length);
        chosenIndexes[i] = gridIndexes[index];
        gridIndexes.splice(index, 1);
    }

    let allCells = [];
    let cellCounter = 0;
    for (let n = 0; n < GRID_LEVELS[level].h; n++)
    {
        allCells[n] = [];
        for (let i = 0; i < GRID_LEVELS[level].w; i++)
        {
            var cellTypeValue = "TYPE_NOT_DEFINED";
            if (chosenIndexes.indexOf(cellCounter) != -1)
            {
                cellTypeValue = CELL_TYPES.FULL;
            }
            else
            {
                cellTypeValue = CELL_TYPES.EMPTY;
            }

            let tempCell = {
                cellState: CELL_STATES.CLOSED,
                cellType: cellTypeValue,
                cellIndex: cellCounter,
            }

            allCells[n][i] = tempCell;

            cellCounter++;
        }
    }

    return allCells;
}

function checkForMatch(index, gameState) 
{
    var cells = gameState.game.allCells;
    for (var n = 0; n < cells.length; n++)
    {
        for (let i = 0; i < cells[n].length; i++)
        {
            if (index == cells[n][i].cellIndex && cells[n][i].cellType == CELL_TYPES.FULL &&
                cells[n][i].cellState == CELL_STATES.CLOSED)
            {
                return true;
            }
        }
    }

    return false;
}

function checkIfLast(gameState)
{
    var cellsData = gameState.game.allCells;
    var numUnopened = 0;
    for (var n = 0; n < cellsData.length; n++)
    {
        for (let i = 0; i < cellsData[n].length; i++)
        {
            if (cellsData[n][i].cellType == CELL_TYPES.FULL && cellsData[n][i].cellState == CELL_STATES.CLOSED) 
            {
                numUnopened++;
            }
        }
    }

    if (numUnopened != 0)
    {
        return false;
    }

    return true;
}

function createSound(src)
{
    var sound = document.createElement("audio");
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);

    return (sound);
}

function clearAllSounds()
{
    Sound.removeAllSounds();
}