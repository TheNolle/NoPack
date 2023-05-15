import React, { useEffect, useState } from 'react'

import './user.scss'

export default function User({ username }) {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            setDate(`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`)
            setTime(`${date.getHours()}:${date.getMinutes()}:${String(date.getSeconds()).padStart(2, '0')}`)
        }, 1000)
    }, [])

    function copyUsername(e) {
        navigator.clipboard.writeText(username)
        e.target.dataset.tip = 'Copied to clipboard!'
        setTimeout(() => e.target.dataset.tip = 'Click to copy username', 1000)
    }

    return (
        <div className="user-container">
            <div className="info">
                <div className="avatar">
                    <img src="https://i.imgur.com/uYSHmLd.jpg" />
                    <div className="status">
                        <div className="icon"></div>
                    </div>
                </div>
                <div className="name">
                    <h1 className="tip" data-tip="Click to copy username" onClick={copyUsername}>{username}</h1>
                    <div className="roller">
                        <p className="date">{date}</p>
                        <p className="time">{time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
