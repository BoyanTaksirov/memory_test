import React, { Component } from "react";
import { CELL_STATES, CELL_TYPES, CELL_VISUAL_STATES, GAME_STATUS, CC_THRES_1, CC_THRES_2, COLOR_1, COLOR_2, COLOR_3, GRID_LEVELS, TEXTS, IMAGES_DATA } from "../state/constants";
import Cell from "../components/cell";

export default class GameScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.proceedClick = this.proceedClick.bind(this);
        this.proceedButtonClick = this.proceedButtonClick.bind(this);
        this.proceedButtonClickBkg = this.proceedButtonClickBkg.bind(this);
    }

    proceedClick(index)
    {
        if (this.props.state.game.gameStatus != GAME_STATUS.STATUS_RUNNING_REMEMBER)
        {
            //console.log("NOT IN MODE!");
            return;
        }
        //console.log(index);
        this.props.onCellClicked(index);
    }

    proceedButtonClick(e)
    {
        e.stopPropagation();
        this.props.onGameButtonClicked();
    }

    proceedButtonClickBkg(e)
    {
        if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_RUNNING_REMEMBER && !this.props.state.game.cancelled)
        {
            return;
        }
        e.stopPropagation();
        this.props.onGameButtonClicked();
    }

    getMessageString()
    {
        var messageString = "";

        if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_PRE_MEMORIZE)
        {
            messageString = TEXTS.When_ready;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_RUNNING_MEMORIZE)
        {
            messageString = TEXTS.Try_to_memorize;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_PRE_REMEMBER)
        {
            messageString = TEXTS.Starting;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_RUNNING_REMEMBER)
        {
            messageString = TEXTS.Click_on_green_cells;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_TIMEOUT)
        {
            messageString = TEXTS.Time_up;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_ERROR)
        {
            messageString = TEXTS.Time_stopped;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_LEVEL_UP)
        {
            messageString = TEXTS.Time_stopped;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_LAST_LEVEL)
        {
            messageString = TEXTS.Time_stopped;
        }

        return messageString;
    }

    getClock(gameState)
    {
        if (gameState.gameStatus == GAME_STATUS.STATUS_PRE_REMEMBER)
        {
            return <div className="clockClass">-- : -- : --</div>;
        }

        let timeObj = this.getTimeString();
        let timeStr = timeObj.timeStr;
        let timeSec = timeObj.timeSec;
        let timeLimit = (this.props.state.game.gameStatus == GAME_STATUS.STATUS_PRE_MEMORIZE ||
            this.props.state.game.gameStatus == GAME_STATUS.STATUS_RUNNING_MEMORIZE) ?
            this.props.state.levelData.timeM : this.props.state.levelData.timeR;

        let elapsedTimePer = (timeSec / timeLimit) * 100;

        //console.log("ELAPSED %: " + elapsedTimePer + " time limit: " + timeLimit + " game status: " + this.props.state.game.gameStatus);

        let styleObj = {
            color: "white",
        }
        if (elapsedTimePer > CC_THRES_1)
        {
            styleObj.color = COLOR_1;
        }
        else if (elapsedTimePer <= CC_THRES_1 && elapsedTimePer > CC_THRES_2)
        {
            styleObj.color = COLOR_2;
        }
        else if (elapsedTimePer <= CC_THRES_2)
        {
            styleObj.color = COLOR_3;
        }

        var clockDisplay = <div className="clockClass" style={styleObj}>{timeStr} sec.</div>;

        return clockDisplay;
    }

    getTimeString()
    {
        let timeSec = this.props.state.game.time;

        let minutesElapsed = Math.floor(timeSec / 60);

        let hours = Math.floor(timeSec / 3600);
        let seconds = timeSec % 60;
        let minutes = minutesElapsed % 60;

        let hoursStr = (hours >= 0 && hours < 10) ? "0" + hours : hours;
        let minutesStr = (minutes >= 0 && minutes < 10) ? "0" + minutes : minutes;
        let secondsStr = (seconds >= 0 && seconds < 10) ? "0" + seconds : seconds;

        var secondsLeft;

        if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_PRE_MEMORIZE || this.props.state.game.gameStatus == GAME_STATUS.STATUS_RUNNING_MEMORIZE)
        {
            secondsLeft = this.props.state.levelData.timeM - timeSec;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_RUNNING_REMEMBER || this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_ERROR ||
            this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_LEVEL_UP || this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_LAST_LEVEL)
        {
            secondsLeft = this.props.state.levelData.timeR - timeSec;
            //console.log("R timeSec: " + timeSec + " sec left: " + secondsLeft);
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_TIMEOUT || this.props.state.game.gameStatus == GAME_STATUS.STATUS_PRE_REMEMBER)
        {
            secondsLeft = 0;
        }

        let secondsLeftStr = (secondsLeft >= 0 && secondsLeft < 10) ? "0" + secondsLeft : secondsLeft;

        return ({
            timeStr: hoursStr + ":" + minutesStr + ":" + secondsLeftStr,
            timeSec: secondsLeft
        });
    }

    getButtonLabel(gameState)
    {
        var gameStatus = gameState.gameStatus;
        var isCancelled = gameState.cancelled;

        var buttonLabel = "NOT_DEFINED";

        if (isCancelled)
        {
            return "Continue";
        }

        switch (gameStatus)
        {
            case GAME_STATUS.STATUS_PRE_MEMORIZE:
                buttonLabel = TEXTS.Start;
                break;

            case GAME_STATUS.STATUS_RUNNING_MEMORIZE:
                buttonLabel = TEXTS.Start;
                break;

            case GAME_STATUS.STATUS_PRE_REMEMBER:
                buttonLabel = TEXTS.Start;
                break;

            case GAME_STATUS.STATUS_RUNNING_REMEMBER:
                buttonLabel = TEXTS.Start;
                break;

            case GAME_STATUS.STATUS_ENDED_LEVEL_UP:
                buttonLabel = TEXTS.Continue;
                break;

            case GAME_STATUS.STATUS_ENDED_TIMEOUT:
                buttonLabel = TEXTS.Continue;
                break;

            case GAME_STATUS.STATUS_ENDED_ERROR:
                buttonLabel = TEXTS.Continue;
                break;

            case GAME_STATUS.STATUS_ENDED_LAST_LEVEL:
                buttonLabel = TEXTS.Continue;
                break;
        }

        return buttonLabel;
    }

    getLevel()
    {
        if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_LEVEL_UP)
        {
            return this.props.state.gameLevel;
        }
        else if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_ENDED_LAST_LEVEL)
        {
            return GRID_LEVELS.length + 1;
        }
        else
        {
            return this.props.state.gameLevel + 1;
        }
    }

    getCellStyle(gameStatus, cellType, cellState)
    {
        var classStr = "NOT_DEFINED";
        var visualState;

        if (gameStatus == GAME_STATUS.STATUS_PRE_MEMORIZE || gameStatus == GAME_STATUS.STATUS_PRE_REMEMBER)
        {
            classStr = "cell cellEmpty";
            visualState = CELL_VISUAL_STATES.COVERED;
        }
        else if (gameStatus == GAME_STATUS.STATUS_RUNNING_MEMORIZE)
        {
            if (cellType == CELL_TYPES.FULL)
            {
                classStr = "cell cellFull";
                visualState = CELL_VISUAL_STATES.SHOW;
            }
            else
            {
                classStr = "cell cellEmpty";
                visualState = CELL_VISUAL_STATES.COVERED;
            }
        }
        else if (gameStatus == GAME_STATUS.STATUS_ENDED_ERROR)
        {
            if (cellType == CELL_TYPES.EMPTY)
            {
                if (cellState == CELL_STATES.OPENED)
                {
                    classStr = "cell cellError";
                    visualState = CELL_VISUAL_STATES.ERROR;
                }
                else
                {
                    classStr = "cell cellEmpty";
                    visualState = CELL_VISUAL_STATES.COVERED;
                }
            }
            else if (cellType == CELL_TYPES.FULL)
            {
                if (cellState == CELL_STATES.OPENED)
                {
                    classStr = "cell cellFull";
                    visualState = CELL_VISUAL_STATES.GUESSED;
                }
                else
                {
                    classStr = "cell cellFullUnopened";
                    visualState = CELL_VISUAL_STATES.UNGUESSED;
                }
            }
        }
        else 
        {
            if (cellState == CELL_STATES.CLOSED)
            {
                let cursorStyle = (gameStatus == GAME_STATUS.STATUS_RUNNING_REMEMBER) ? " cellCursor" : "";
                classStr = "cell cellEmpty" + cursorStyle;
                visualState = CELL_VISUAL_STATES.COVERED;
            }
            else if (cellState == CELL_STATES.OPENED && cellType == CELL_TYPES.FULL)
            {
                classStr = "cell cellFull";
                visualState = CELL_VISUAL_STATES.GUESSED;
            }
            else if (cellState == CELL_STATES.OPENED && cellType == CELL_TYPES.EMPTY)
            {
                classStr = "cell cellError";
                visualState = CELL_VISUAL_STATES.ERROR;
            }
        }

        return {
            class: classStr,
            visual: visualState,
        }
    }

    getMessagePopup(gameState)
    {
        var gameStatus = gameState.gameStatus;

        if (gameState.cancelled)
        {
            return (<div className="messagePopup bkgRed">GAME CANCELLED!</div>);
        }

        var styleObj = {
            animation: "fadeIn 0.5s forwards",
        }

        switch (gameStatus)
        {
            case GAME_STATUS.STATUS_PRE_REMEMBER:
                //return (<div className="messagePopupLevelUp" style = {styleObj}>READY?</div>);
                return null;

            case GAME_STATUS.STATUS_ENDED_LEVEL_UP:
                return (<div className="messagePopup bkgGreen" style={styleObj}>LEVEL UP!</div>);

            case GAME_STATUS.STATUS_ENDED_LAST_LEVEL:
                return (<div className="messagePopup bkgGreen" style={styleObj}>LAST LEVEL DONE!</div>);

            case GAME_STATUS.STATUS_ENDED_ERROR:
                return (<div className="messagePopup bkgRed" style={styleObj}>ERROR! GAME OVER!</div>);

            case GAME_STATUS.STATUS_ENDED_TIMEOUT:
                return (<div className="messagePopup bkgRed" style={styleObj}>TIME UP!</div>);

            default:
                return null;
        }
    }

    render()
    {
        let state = this.props.state;

        let cells = [];
        let rowLength = state.game.allCells.length;
        let columnHeight = state.game.allCells[0].length;

        var clickedIndex = state.game.clickedIndex;
        var counter = 0;
        for (let n = 0; n < columnHeight; n++)
        {
            for (let i = 0; i < rowLength; i++)
            {
                let cellData = this.props.state.game.allCells[n][i];

                var cellDataObj = this.getCellStyle(state.game.gameStatus, cellData.cellType, cellData.cellState);
                var classStr = cellDataObj.class;
                var visualState = cellDataObj.visual;

                var isAnim = false;
                if (cellData.cellIndex == clickedIndex)
                {
                    isAnim = true;
                }

                let tempCell = <Cell key={cellData.cellIndex} index={cellData.cellIndex} cellType={cellData.cellType} cellState={cellData.cellState}
                    vState={visualState} proceedClick={this.proceedClick} cellClass={classStr} isAnim={isAnim}>counter</Cell>

                cells.push(tempCell);
                counter++;
            }
        }

        var messageString = this.getMessageString();
        var clock = this.getClock(state.game);
        var messagePopup = this.getMessagePopup(state.game);

        var styleButton = {
            marginTop: "3vmin",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: "75%",
        }

        var size = (window.innerWidth > window.innerHeight) ? window.innerHeight * 0.6 : window.innerWidth * 0.6;

        if (window.innerHeight > window.innerWidth * 1.2)
        {
            size = window.innerWidth * 0.8;

            styleButton.height = "12vmin";
            styleButton.lineHeight = "12vmin";
            styleButton.fontSize = "6vmin";
        }

        var buttonLabel = this.getButtonLabel(state.game);

        var button = null;
        if (this.props.state.game.gameStatus == GAME_STATUS.STATUS_PRE_REMEMBER || this.props.state.game.gameStatus == GAME_STATUS.STATUS_RUNNING_REMEMBER)
        {
            styleButton.backgroundColor = "rgb(95, 95, 95)";
            styleButton.color = "rgb(148, 148, 148)";
            button = <div className="GS_GameButton"  style={styleButton}>{buttonLabel}</div>
        }
        else
        {
            button = <div className="GS_GameButton" onClick={this.proceedButtonClick} style={styleButton}>{buttonLabel}</div>
        }

        var styleLevel = {
            textAlign: "right",
            marginRight: "2vw",
        }
        var styleScore = {
            textAlign: "left",
            marginLeft: "2vw",
        }



        var containerStyleObj = {
            gridTemplateColumns: "repeat(" + rowLength + ", 1fr)",
            width: size + "px",
            height: size + "px",
        }

        return (
            <div className="gvContainer" onClick={this.proceedButtonClickBkg}>
                <div className="headerContainer">
                    <div className="levelScoreContainer">
                        <div className="levelClass" style={styleLevel}>Level: {this.getLevel()}</div>
                        <div className="levelClass" style={styleScore}>Score: {this.props.state.score}</div>
                    </div>
                    <div className="messageClass">{messageString}</div>
                    {clock}
                </div>
                <div className="gvCellContainer" style={containerStyleObj}>
                    {cells}
                </div>
                {messagePopup}
                {button}
            </div>
        )
    }
}