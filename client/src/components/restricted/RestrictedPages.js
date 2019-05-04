import React, { Fragment } from 'react'
import { Switch } from 'react-router-dom'

// Custom component preventing access to restricted pages
import PrivateRoute from './PrivateRoute'

import Navbar from './Navbar'

// Pages components
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Search from './pages/Search'
import Me from './pages/Me';
import Invitations from './pages/Invitations'

export default function RestrictedPages() {
    return (
        <Fragment>
        <Navbar />
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/search" component={Search} />
                <PrivateRoute path="/me" component={Me} />
                <PrivateRoute path="/invitations" component={Invitations} />
                <PrivateRoute component={NotFound} />
            </Switch>
        </Fragment>
    )
}