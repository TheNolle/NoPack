import React, { useEffect } from 'react'

import loadingGIF from '../../../../static/img/loading.gif'

import './list.scss'

import Modpack from '../modpack/modpack'

export default function List({ modpacks = [], loading }) {
    useEffect(() => {
        const element = document.querySelector('.list-container > .modpack-container')
        element && element.click()
    }, [])

    function openModpack(name) {
        console.log(`Opening modpack ${name}`)
    }

    return (
        <div className="list-container">
            {
                loading ? (<div className="loading-container"><img src={loadingGIF} alt="Loading..." /></div>) : (
                    modpacks.length === 0 ? (<div className="no-modpacks-container"><p>No modpacks found</p></div>) :
                        modpacks.map((modpack, index) => <Modpack key={modpack.name} icon={modpack.icon} name={modpack.name} description={modpack.description} loader={modpack.loader} version={modpack.version} callback={() => openModpack(modpack.name)} />)
                )
            }
        </div>
    )
}