import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages components
import Welcome from './components/public/Welcome'

import RestrictedPages from './components/restricted/RestrictedPages'

export default function App() {
    return (
        <Switch>
            {/* Public pages */}
            <Route path="/welcome" component={Welcome} />

            {/* Private pages */}
            <Route component={RestrictedPages} />
        </Switch>
    )
}
