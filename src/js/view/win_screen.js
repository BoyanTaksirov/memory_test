import React, { Component } from "react";
import {IMAGES_DATA } from "../state/constants";

export default class WinScreen extends Component
{
    constructor(props)
    {
        super(props);

        this.proceedClick = this.proceedClick.bind(this);
    }

    proceedClick(e)
    {
        e.stopPropagation();
        this.props.showBeginScreen();
    }

    render()
    {
        var styleObj = {
            position: "absolute",
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

            styleObj.height = "12vmin";
            styleObj.lineHeight = "12vmin";
            styleObj.fontSize = "6vmin";
        }


        return(
            <div className = "BS_Bkg" onClick = {this.proceedClick}>
                  <img className = "splash" src = {IMAGES_DATA.win}></img>
                <div className = "GS_GameButton" style = {styleObj} onClick = {this.proceedClick}>Continue</div>
            </div>
        )
    }
}