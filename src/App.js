import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.scss'

import Sidebar from './components/sidebar/sidebar'

import ModpacksPage from './pages/modpacks-page/modpacks-page'

export default function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <Routes>
                <Route path='/' element={<ModpacksPage />} />
            </Routes>
        </div>
    )
}
