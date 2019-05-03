import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Custom component preventing access to restricted pages
import PrivateRoute from './components/PrivateRoute'

// Pages components
import Welcome from './components/public/Welcome'
import NotFound from './components/public/NotFound'
import Home from './components/restricted/Home'
import Search from './components/restricted/Search'
import Me from './components/restricted/Me';
import Invitations from './components/restricted/Invitations'

export default function App() {
    return (
        <Switch>
            {/* Public pages */}
            <Route path="/welcome" component={Welcome} />

            {/* Private pages */}
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/me" component={Me} />
            <PrivateRoute path="/invitations" component={Invitations} />

            {/* Not found page */}
            <Route component={NotFound} />
        </Switch>
    )
}
