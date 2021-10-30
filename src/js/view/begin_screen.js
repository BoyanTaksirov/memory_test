import React, { Component } from "react";
import LevelMenu from "../components/levelMenu";
import { GRID_LEVELS, IMAGES_DATA, TEXTS } from "../state/constants";

export default class BeginScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.onLevelClicked = this.onLevelClicked.bind(this);
    }

    onLevelClicked(index)
    {
        this.props.onLevelClicked(index);
    }

    render()
    {
        var startBtnStyle = {
            position: "absolute",
            marginTop: "3vmin",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            height: "6vmin",
            lineHeight: "6vmin",
            fontSize: "5vmin",
            top: "80%",
        }

        var selectBtnStyle = {}

        var size = (window.innerWidth > window.innerHeight) ? window.innerHeight * 0.6 : window.innerWidth * 0.6;

        if (window.innerHeight > window.innerWidth * 1.2)
        {
            size = window.innerWidth * 0.8;

            startBtnStyle.height = "12vmin";
            startBtnStyle.lineHeight = "12vmin";
            startBtnStyle.fontSize = "6vmin";

            selectBtnStyle.height = "12vmin";
            selectBtnStyle.lineHeight = "12vmin";
            selectBtnStyle.fontSize = "6vmin";
        }

        var selectLevelLabel = TEXTS.Select_Level + (this.props.level + 1);

        return (
            <div className="BS_Bkg" onClick={this.props.hideLevelMenu}>
                <LevelMenu onLevelClicked={this.onLevelClicked} numLevels={GRID_LEVELS.length} show={this.props.levelMenuOn}
                    level={this.props.level} maxLevel={this.props.maxLevel} />
                <img className="splash" src={IMAGES_DATA.splash}></img>
                <div className="selectLevelButton"style={selectBtnStyle} onClick={this.props.onSelectLevelClicked}>{selectLevelLabel}</div>
                <div className="GS_GameButton" style={startBtnStyle} onClick={this.props.onStartGameClicked}>Start</div>
            </div>
        )
    }
}