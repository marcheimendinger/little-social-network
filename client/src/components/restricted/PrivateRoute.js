import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import isAuthenticated from '../isAuthenticated'

// Custom Route component preventing access to restricted pages by checking if user is authenticated
// If this is not the case, redirect to '/welcome'
// Inspiration : https://reacttraining.com/react-router/web/example/auth-workflow
export default function PrivateRoute({ component: Component, ...rest }) {
    const authenticated = isAuthenticated()

    return (
        <Route
            {...rest}
            render = { props =>
                authenticated ? (
                    <Component {...props} />
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