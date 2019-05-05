import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

// Prevent access to restricted pages by checking if user is authenticated
// Inspiration : https://reacttraining.com/react-router/web/example/auth-workflow
export default function PrivateRoute({ component: Component, ...rest }) {
    const [cookies] = useCookies(['/'])

    // Check if authentication cookie is present
    const authenticated = cookies['connect.sid'] !== undefined

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