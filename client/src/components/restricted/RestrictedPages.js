import React, { Fragment } from 'react'
import { Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// Custom component preventing access to restricted pages
import PrivateRoute from './PrivateRoute'

import Navbar from './ui/Navbar'

// Pages components
import NotFound from './NotFound'
import Home from './Home'
import Search from './Search'
import Me from './Me';
import Invitations from './Invitations'

export default function RestrictedPages() {
    return (
        <Fragment>
            <Navbar />
            <Container>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/search" component={Search} />
                    <PrivateRoute path="/me" component={Me} />
                    <PrivateRoute path="/invitations" component={Invitations} />
                    <PrivateRoute component={NotFound} />
                </Switch>
            </Container>
        </Fragment>
    )
}