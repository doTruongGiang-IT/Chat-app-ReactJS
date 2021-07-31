import React from 'react';
import './InfoBar.css';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

const InfoBar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="icon" />
                <h2>{room.toUpperCase()}</h2>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close" /></a>
            </div>
        </div>
    )
}

export default InfoBar;
