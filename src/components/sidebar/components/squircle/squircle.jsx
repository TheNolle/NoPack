import React from 'react'

import './squircle.scss'

export default function Squircle({ color, iconType, iconName, text, callback }) {
    return (
        <li className={`squircle ${color}`} onClick={callback}>
            <i className={`fa-${iconType} fa-${iconName} icon`}></i>
            <p>{text}</p>
        </li>
    )
}
