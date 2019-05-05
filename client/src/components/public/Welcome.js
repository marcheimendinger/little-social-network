import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import Login from './Login'
import Register from './Register'

// TODO : Add cookie check, if authenticated redirect to '/'
export default function Welcome() {
    return(
        <Fragment>
            <h1>Welcome</h1>
            <Row>
                <Col>
                    <Login />
                </Col>
                <Col>
                    <Register />
                </Col>
            </Row>
        </Fragment>
    )
}