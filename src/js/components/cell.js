import React, { Component } from "react";
import { CELL_TYPES, CELL_VISUAL_STATES, IMAGES_DATA } from "../state/constants";

export default class Cell extends React.Component
{
    constructor(props)
    {
        super(props);

        this.proceedCellClick = this.proceedCellClick.bind(this);
    }

    proceedCellClick(e)
    {
        e.stopPropagation();
        //console.log(this.props.index);
        this.props.proceedClick(this.props.index);
    }

    render()
    {
        var styleObj = {
            animation: "",
        }
        if (this.props.isAnim)
        {
            styleObj.animation = "fadeIn 0.5s forwards";
        }
        var picture = null;
        switch (this.props.vState)
        {
            case CELL_VISUAL_STATES.SHOW:
                picture = <img src={IMAGES_DATA.show} className="cell_Img" style={styleObj}></img>
                break;

            case CELL_VISUAL_STATES.ERROR:
                picture = <img src={IMAGES_DATA.error} className="cell_Img" style={styleObj}></img>
                break;

            case CELL_VISUAL_STATES.GUESSED:
                picture = <img src={IMAGES_DATA.check} className="cell_Img" style={styleObj}></img>
                break;

            case CELL_VISUAL_STATES.UNGUESSED:
                picture = <img src={IMAGES_DATA.unguess} className="cell_Img" style={styleObj}></img>
                break;
        }
        return (
            <div key={this.props.index} className={this.props.cellClass} onClick={this.proceedCellClick}>
                {picture}
            </div>
        )
    }
}