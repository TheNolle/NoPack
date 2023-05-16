import React from 'react'

import placeholder from '../../../../static/img/placeholder_square.jpg'

import './modpack.scss'

export default function Modpack({ icon, name, description, loader, version, callback }) {
    icon = icon || placeholder

    function clicked(e) {
        document.querySelectorAll('.modpack-container').forEach((el) => el.classList.remove('selected'))
        e.currentTarget.classList.add('selected')
    }

    return (
        <div className="modpack-container" title={`Loader: ${loader}\nVersion: ${version}`} onClick={(e) => { clicked(e); callback() }}>
            <div className="icon"><img src={icon} /></div>
            <div className="info">
                <h1 title={name.length > 12 ? name : null}>{name.length > 12 ? `${name.substring(0, 12)}...` : name}</h1>
                <span title={description.length > 30 ? description : null}>{description.length > 30 ? `${description.substring(0, 30)}...` : description}</span>
            </div>
        </div>
    )
}
