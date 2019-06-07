import React, { Fragment } from 'react'
import { Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import Home from './Home'
import Search from './Search'
import Me from './Me'
import MeEdit from './MeEdit'
import Invitations from './Invitations'
import User from './User'

import Navbar from './ui/Navbar'

// Routing all restricted pages to URLs and adding the navbar on top of every of them
export default function RestrictedPages(props) {
    return (
        <Fragment>
            <Navbar {...props} />
            <Container className="mb-4">
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/search" component={Search} />
                    <PrivateRoute exact path="/me" component={Me} />
                    <PrivateRoute path="/me/edit" component={MeEdit} />
                    <PrivateRoute path="/invitations" component={Invitations} />
                    <PrivateRoute path="/user/:user_id" component={User} />
                    <PrivateRoute component={NotFound} />
                </Switch>
            </Container>
        </Fragment>
    )
}