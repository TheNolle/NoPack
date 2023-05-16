import React from 'react'
import ReactMarkdown from 'react-markdown'

import rdme from './README.md'

import './modpack-content.scss'
import 'github-markdown-css/github-markdown.css'

export default function ModpackContent({ modpack }) {
    const { name, description, version, banner, loader, icon, readme = rdme } = modpack

    return (
        <div className="modpack-content-container">
            <div className="content">
                <div className="banner">
                    <div className="overlay"></div>
                    <h1>{name}</h1>
                    <p>{description.length > 600 ? description.slice(0, 600) + '...' : description}</p>
                    <img src={banner} alt={`${name} banner`} />
                </div>
                <div className="markdown-body">
                    {readme ? <ReactMarkdown>{readme}</ReactMarkdown> : <div className="no-readme">No readme found</div>}
                </div>
            </div>
            <footer>
                <div className="infos">
                    <div className="icon"><img src={icon} alt={`${name} icon`} /></div>
                    <div className="text">
                        <div className="name"><h3>Name:</h3><p>{name}</p></div>
                        <div className="version"><h3>Version:</h3><p>{version}</p></div>
                        <div className="loader"><h3>Loader:</h3><p>{loader}</p></div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="update">Check for updates</button>
                    <button className="delete">Delete</button>
                    <button className="play">Play</button>
                </div>
            </footer>
        </div>
    )
}
