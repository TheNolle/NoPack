import React, { useEffect, useState } from 'react'

import './user.scss'

export default function User() {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            setDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
            setTime(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        }, 1000)
    }, [])

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
                    <h1 className="tip" data-tip="Click to copy username">_Nolly</h1>
                    <div className="roller">
                        <p className="date">{date}</p>
                        <p className="time">{time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
