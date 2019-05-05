import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import isAuthenticated from '../isAuthenticated'

// Prevent access to restricted pages by checking if user is authenticated
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