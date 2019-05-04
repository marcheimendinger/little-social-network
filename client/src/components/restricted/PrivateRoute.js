import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

// Prevent access to restricted pages by checking if user is authenticated
// Also add Navbar component before main component
// Inspiration : https://reacttraining.com/react-router/web/example/auth-workflow
export default function PrivateRoute({ component: Component, ...rest }) {
    const authenticated = true // For testing purpose

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