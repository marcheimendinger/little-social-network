import React, { Fragment } from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

import Navbar from './restricted/Navbar'

// Prevent access to restricted pages by checking if user is authenticated
// Inspiration : https://reacttraining.com/react-router/web/example/auth-workflow
export default function PrivateRoute({ component: Component, ...rest }) {
    const authenticated = true // For testing purpose

    return (
        <Route
            {...rest}
            render = { props =>
                authenticated ? (
                    <Fragment>
                        <Navbar />
                        <Component {...props} />
                    </Fragment>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/welcome",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}