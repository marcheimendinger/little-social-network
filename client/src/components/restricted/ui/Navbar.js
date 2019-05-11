import React from 'react'
import { Navbar as NavbarBS, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Logout from '../Logout'

export default function Navbar() {
    return (
        <NavbarBS bg="danger" variant="dark" className="mb-4" sticky="top">
            <Container>
                <Nav>
                    <LinkContainer exact to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/me">
                        <Nav.Link>My profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/invitations">
                        <Nav.Link>Invitations</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/search">
                        <Nav.Link>Search</Nav.Link>
                    </LinkContainer>
                    {/* TODO : add the form directly to the navbar */}
                    {/* <SearchForm {...props} /> */}
                </Nav>
                <Nav>
                    <Logout />
                </Nav>
            </Container>
        </NavbarBS>
    )
}