import React, { Component } from "react";
import { SCREENS, IMAGES_DATA } from "../state/constants";
import BeginScreen from "./begin_screen";
import GameScreen from "./game_screen";
import WinScreen from "./win_screen";

export default class GameView extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let BeginScreenInstance = null;
        let GameScreenInstance = null;
        let WinScreenInstance = null;

        switch (this.props.state.screen)
        {
            case SCREENS.BEGIN_SCREEN:
                BeginScreenInstance = <BeginScreen onStartGameClicked={this.props.callbacks.onStartGameClicked} onLevelClicked={this.props.callbacks.onLevelClicked}
                    levelMenuOn={this.props.state.levelMenuOn} level={this.props.state.gameLevel} maxLevel={this.props.state.maxLevel}
                    onSelectLevelClicked={this.props.callbacks.onSelectLevelClicked} hideLevelMenu={this.props.callbacks.hideLevelMenu} />;
                break;

            case SCREENS.GAME_SCREEN:
                GameScreenInstance = <GameScreen state={this.props.state} onCellClicked={this.props.callbacks.onCellClicked}
                    onGameButtonClicked={this.props.callbacks.onGameButtonClicked} />;
                break;

            case SCREENS.WIN_SCREEN:
                WinScreenInstance = <WinScreen showBeginScreen={this.props.callbacks.resetToBeginScreen} />;
                break;

            default:
                BeginScreenInstance = <BeginScreen />;
        }

        var exitButton = null;

        if (GameScreenInstance)
        {
            exitButton = <img className="exitButton" src={IMAGES_DATA.exit} onClick = {this.props.callbacks.resetToBeginScreen}></img>;
        }

        return (
            <div className="full gameBkg">
                {BeginScreenInstance}
                {GameScreenInstance}
                {WinScreenInstance}
                {exitButton}
            </div>
        )
    }
}