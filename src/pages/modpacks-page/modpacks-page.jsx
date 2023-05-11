import React from 'react'

import './modpacks-page.scss'

import ModpacksList from '../../components/modpacks-list/modpacks-list'

export default function ModpacksPage() {
    return (
        <div className="modpacks-page-container">
            <ModpacksList />
        </div>
    )
}
