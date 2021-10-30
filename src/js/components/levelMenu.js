import React, { Component } from "react";
import { GRID_LEVELS, LEVEL_GROUP_SIZE } from "../state/constants";

export default class LevelMenu extends Component
{
    constructor(props)
    {
        super(props);

        this.numLevels = this.props.numLevels;
        this.show = this.props.show;
        this.maxLevel = this.props.maxLevel;

        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked(index)
    {
        this.props.onLevelClicked(index);
    }

    render()
    {
        var levelButtons = [];
        if (!this.props.show)
        {
            return null;
        }

        for (let i = 0; i < this.numLevels; i++)
        {
            let label = "Level " + (i + 1);
            var clickHandler = null;
            var style = {
                color: "rgb(170, 170, 170)",
                backgroundColor: "rgb(112, 112, 112)",
            }

            var currentLevelGroup = Math.ceil((this.maxLevel + 1)/LEVEL_GROUP_SIZE);
            var maxUnlockedLevel = currentLevelGroup*LEVEL_GROUP_SIZE;
            if (i < maxUnlockedLevel)
            {
                clickHandler = () => this.buttonClicked(i);
                style = null;
            }
            let button = <div key={i} className="menuButton" style={style} onClick={clickHandler}>{label}</div>
            levelButtons.push(button);
        }

        return (
            <div className="menuButtonsContainer">
                {levelButtons}
            </div>
        )
    }
}