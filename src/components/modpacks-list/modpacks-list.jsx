import React, { useEffect, useState } from 'react'

import './modpacks-list.scss'

import SearchBox from './components/search-box/search-box'
import List from './components/list/list'
import User from './components/user/user'

export default function ModpacksList() {
    const [modpacks, setModpacks] = useState([])
    const [loading, setLoading] = useState(true)

    async function getModpacks() {
        const result = await window.modpacks.getAll()
        console.log(result)
        return result
    }

    function filter(text) {
        const list = document.querySelector('.list-container')
        const modpacks = Array.from(list.querySelectorAll('.modpack-container'))

        modpacks.forEach(modpack => {
            const name = modpack.querySelector('.info h1').innerText
            const description = modpack.querySelector('.info span').innerText
            const loader = modpack.getAttribute('title').split('\n')[0].replace('Loader: ', '')
            const version = modpack.getAttribute('title').split('\n')[1].replace('Version: ', '')

            if (text.startsWith('#')) return description.toLowerCase().includes(text.replace('#', '').toLowerCase()) ? modpack.classList.remove('hidden') : modpack.classList.add('hidden')
            if (text.startsWith('@')) return loader.toLowerCase().includes(text.replace('@', '').toLowerCase()) ? modpack.classList.remove('hidden') : modpack.classList.add('hidden')
            if (text.startsWith('$')) return version.toLowerCase().includes(text.replace('$', '').toLowerCase()) ? modpack.classList.remove('hidden') : modpack.classList.add('hidden')
            name.toLowerCase().includes(text.toLowerCase()) ? modpack.classList.remove('hidden') : modpack.classList.add('hidden')
        })
    }

    useEffect(() => {
        getModpacks()
            .then(modpacks => setModpacks(modpacks))
            .then(() => setLoading(false))
    }, [])

    return (
        <div className="modpacks-list-container">
            <SearchBox callback={(text) => filter(text)} />
            <List modpacks={modpacks} loading={loading} />
            <User username="_Nolly" />
        </div>
    )
}
