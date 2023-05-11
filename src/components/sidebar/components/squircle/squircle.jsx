import React from 'react'

import './squircle.scss'

export default function Squircle({ color, iconType, iconName, text, callback }) {
    return (
        <li className={`squircle ${color}`} onClick={callback}>
            <i className={`fa-${iconType} fa-${iconName} icon`}></i>
            <div className="popper">
                <h4 className="text">{text}</h4>
            </div>
        </li>
    )
}
