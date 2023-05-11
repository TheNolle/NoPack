import React from 'react'

export default function Main({color, text, iconType, iconName, callback}) {
    return (
        <li className={`squircle ${color}`} onClick={callback}>
            <i className={`fa-${iconType} fa-${iconName} icon`}></i>
            <div className="popper">
                <h4 className="text">{text}</h4>
            </div>
        </li>
    )
}
