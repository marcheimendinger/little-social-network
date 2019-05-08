import React from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'

import isAuthenticated from '../isAuthenticated'
import Login from './Login'
import Register from './Register'

export default function Welcome() {

    // If authenticated, redirect to '/'
    const authenticated = isAuthenticated()
    if (authenticated) {
        return <Redirect to="/" />
    }

    return(
        <Container>
            <h1 className="text-danger my-5">Welcome</h1>
            <Row>
                <Col>
                    <Login />
                </Col>
                <Col>
                    <Register />
                </Col>
            </Row>
        </Container>
    )
}