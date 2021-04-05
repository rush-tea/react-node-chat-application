import React from 'react';

import closeIcon from '../../Icons/closeIcon.png';
import onlineIcon from '../../Icons/onlineIcon.png'

import './InfoBar.css';

const Infobar = ({room}) => {
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online_image" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} alt="close_image" />
                </a>
            </div>
        </div>
    )
}

export default Infobar;