import React from 'react'

import './search-box.scss'

export default function SearchBox({ callback }) {
    return (
        <div className="search-box-container">
            <input type="text" placeholder="Search" autoFocus onChange={(event) => callback(event.target.value)} />
        </div>
    )
}
