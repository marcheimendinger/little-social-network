import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { setLocale } from 'yup'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// Pages components
import Welcome from './components/public/Welcome'

import RestrictedPages from './components/restricted/RestrictedPages'

export default function App() {
    // Custom error messages for forms validation with Yup
    // https://github.com/jquense/yup#using-a-custom-locale-dictionary
    setLocale({
        mixed: {
            default: 'Not valid',
            required: 'Required'
        },
        string: {
            min: 'Too short',
            max: 'Too long',
            email: 'Not a valid email address'
        }
    })

    // Initialize time formatting
    JavascriptTimeAgo.locale(en)

    return (
        <Switch>
            {/* Public pages */}
            <Route path="/welcome" component={Welcome} />

            {/* Private pages */}
            <Route component={RestrictedPages} />
        </Switch>
    )
}
