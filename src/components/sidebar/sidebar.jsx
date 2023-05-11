import React, { useEffect } from 'react'

import './sidebar.scss'

import Squircle from './components/squircle/squircle'
import Divider from './components/divider/divider'
import Main from './components/home/main'

export default function Sidebar() {
    useEffect(() => {
        const active = document.querySelector('.active')
        !active && document.querySelectorAll('.squircle')[0].click()
    }, [])
    
    function toggleActive(e) {
        const active = document.querySelector('.active')
        active && active.classList.remove('active')
        e.currentTarget.classList.add('active')
    }

    return (
        <nav className="sidebar-container">
            <ul className="squircles">
                <Main color="blurple" text="Modpacks" iconType="solid" iconName="pallet-boxes" callback={toggleActive} />
                <Divider />
                <Squircle iconType="solid" iconName="gear" text="Settings" callback={toggleActive} />
                <Divider />
                <Squircle color="fantastic-green" iconType="solid" iconName="globe" text="My Website" callback={() => window.shell.openExternal('https://thenolle.com')} />
                <Squircle color="fantastic-green" iconType="brands" iconName="discord" text="Discord Server" callback={() => window.shell.openExternal('https://discord.com/invite/86yVsMVN9z')} />
                <Squircle color="fantastic-green" iconType="brands" iconName="github-alt" text="My Github" callback={() => window.shell.openExternal('https://github.com/TheNolle')} />
                <Squircle color="fantastic-green" iconType="brands" iconName="github" text="App's Repository" callback={() => window.shell.openExternal('https://github.com/TheNolle/NoPack')} />
            </ul>
        </nav>
    )
}
