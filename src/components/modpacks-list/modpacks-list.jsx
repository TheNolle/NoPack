import React from 'react'

import './modpacks-list.scss'

import SearchBox from './components/search-box/search-box'
import User from './components/user/user'

export default function ModpacksList() {
    return (
        <div className="modpacks-list-container">
            <SearchBox />
            <User />
        </div>
    )
}
