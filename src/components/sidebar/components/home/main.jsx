import React from 'react'

export default function Main({color, text, iconType, iconName, callback}) {
    return (
        <li className={`squircle ${color}`} onClick={callback}>
            <i className={`fa-${iconType} fa-${iconName} icon`}></i>
            <p>{text}</p>
        </li>
    )
}
