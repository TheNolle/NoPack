import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Buffer } from 'buffer'

import './index.scss'
import './static/scss/colors.scss'
import './static/scss/scrollbar.scss'
import './static/scss/modals.scss'

import App from './App'

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )

window.Buffer = Buffer
