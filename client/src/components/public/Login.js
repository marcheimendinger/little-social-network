import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import API from '../API'
import Alert from '../Alert'

// Inspiration :
// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms/
// https://www.taniarascia.com/crud-app-in-react-with-hooks/
export default function Login() {
    const initialUser = { username: '', password: '' }
    const [user, setUser] = useState(initialUser)

    const [redirect, setRedirect] = useState(false)

    const [error, setError] = useState({ type: 'error' })

    async function handleSubmit(event) {
        try {
            event.preventDefault() // Prevent page reload
            if (!user.username || !user.password) {
                throw new Error('All fields are required')
            }
            await API.post('/user/login', {
                username: user.username,
                password: user.password
            })
            setRedirect(true)
        } catch (e) {
            setError({ ...error, text: e.toString() })
        }
    }

    function handleChange(event) {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <Alert type={error.type} text={error.text} />
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} value={user.username} />
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={user.password} />
                <button>Login</button>
            </form>
        </div>
    )
}