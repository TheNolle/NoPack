import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ReactModal from 'react-modal'
import { ToastContainer } from 'react-toastify'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Sidebar from './components/sidebar/sidebar'

// Pages
import ModpacksPage from './pages/modpacks-page/modpacks-page'

export default function App() {
    ReactModal.setAppElement('#root')

    return (
        <div className="app-container">
            <Sidebar />
            <Routes>
                <Route path='/' element={<ModpacksPage />} />
            </Routes>
            <ToastContainer position="bottom-right" limit={5} theme="colored" />
        </div>
    )
}
