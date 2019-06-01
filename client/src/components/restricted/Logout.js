import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Nav } from 'react-bootstrap'

import API from '../API'

// Perform a logout (server and client side) by removing the cookie and redirecting to '/welcome'
export default function Logout() {
    const [redirectToWelcome, setRedirectToWelcome] = useState(false)

    const removeCookie = useCookies(['/'])[2] // `[2]` to only get the `removeCookie` function

    // Clear session server-side and remove cookie client-side
    async function getLogout() {
        try {
            // Get the server logout
            await API.get('/user/logout')
        } catch (e) {
            console.log(e)
        }
        removeCookie('connect.sid')
        setRedirectToWelcome(true)
    }

    if (redirectToWelcome) {
        return <Redirect to="/welcome" />
    }

    return (
        <Nav.Link onClick={getLogout}>Logout</Nav.Link>
    )
}