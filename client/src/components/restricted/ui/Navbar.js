import React from 'react'
import { Navbar as NavbarBS, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaSearch } from 'react-icons/fa'

import Logout from '../Logout'

// Navigation bar
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
                        <Nav.Link><FaSearch /></Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <Logout />
                </Nav>
            </Container>
        </NavbarBS>
    )
}