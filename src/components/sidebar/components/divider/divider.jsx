import React from 'react'

import './divider.scss'

export default function Divider({ color }) {
    color = color || 'full-white'
    return (
        <li className={`divider ${color}`}></li>
    )
}
