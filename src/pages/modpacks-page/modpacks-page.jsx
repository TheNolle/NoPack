import React, { useState } from 'react'

import './modpacks-page.scss'

import ModpacksList from '../../components/modpacks-list/modpacks-list'
import ModpackContent from '../../components/modpack-content/modpack-content'

export default function ModpacksPage() {
    const [currentModpack, setCurrentModpack] = useState(null)

    return (
        <div className="modpacks-page-container">
            <ModpacksList callback={(modpack) => setCurrentModpack(modpack)} />
            {currentModpack && <ModpackContent modpack={currentModpack} />}
        </div>
    )
}
