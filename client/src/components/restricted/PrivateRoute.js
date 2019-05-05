import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

// Prevent access to restricted pages by checking if user is authenticated
// Also add Navbar component before main component
// Inspiration : https://reacttraining.com/react-router/web/example/auth-workflow
export default function PrivateRoute({ component: Component, ...rest }) {
    const [cookies] = useCookies(['/'])

    const [authenticated] = useState(
        cookies['connect.sid'] !== undefined
    )

    useEffect(() => {
        console.log(authenticated)
    }, []) // `[]` prevent infinite loop

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