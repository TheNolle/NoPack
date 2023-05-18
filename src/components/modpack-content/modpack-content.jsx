import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import ReactModal from 'react-modal'

import './modpack-content.scss'
import 'github-markdown-css/github-markdown.css'

export default function ModpackContent({ modpack }) {
    const { id, name, description, version, banner, loader, icon, readme } = modpack

    const [errorMessage, setErrorMessage] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [confirmationText, setConfirmationText] = useState('')

    function openConfirmationModal() {
        setErrorMessage(null)
        setModalIsOpen(true)
    }
    function closeConfirmationModal() {
        setModalIsOpen(false)
        setConfirmationText('')
    }

    function checkForUpdates() {
        console.log(`Checking for updates on ${name} (${id}))`)
    }

    async function deleteModpack() {
        if (confirmationText !== name) {
            setErrorMessage('The confirmation text does not match the modpack name.')
            return setConfirmationText('')
        }
        await window.modpacks.delete(id)
        closeConfirmationModal()
    }

    function playModpack() {
        console.log(`Playing ${name} (${id}))`)
    }

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
                    <button className="update" onClick={() => checkForUpdates()}>Check for updates</button>
                    <button className="delete" onClick={() => openConfirmationModal()}>Delete</button>
                    <button className="play" onClick={() => playModpack()}>Play</button>
                </div>
            </footer>
            <ReactModal isOpen={modalIsOpen} onRequestClose={() => closeConfirmationModal()} contentLabel="Confirmation Modal" className="modal-content" overlayClassName="modal-overlay">
                <div className="modal-header">
                    <h2>Delete Modpack</h2>
                    <button className="close-button" onClick={() => closeConfirmationModal()}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete the modpack: {name}?</p>
                    <p>Please type <code>{name}</code> to confirm.</p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <input type="text" placeholder={`Type "${name}" here`} value={confirmationText} onChange={e => { setConfirmationText(e.target.value); setErrorMessage(null); }} onKeyDown={(e) => e.key === 'Enter' && deleteModpack()} required />
                </div>
                <div className="modal-footer">
                    <button className="cancel-button" onClick={() => closeConfirmationModal()}>Cancel</button>
                    <button className="confirm-button" onClick={() => deleteModpack()}>Confirm</button>
                </div>
            </ReactModal>
        </div>
    )
}
