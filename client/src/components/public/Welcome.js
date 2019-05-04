import React, { Fragment } from 'react'

import Login from './Login'

export default function Welcome() {
    return(
        <Fragment>
            <h1>Welcome</h1>
            <Login />
            <h2>Register</h2>
        </Fragment>
    )
}