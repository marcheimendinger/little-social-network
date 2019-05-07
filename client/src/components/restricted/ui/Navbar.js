import React from 'react'
import { Navbar as NavbarBS, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function Navbar() {
    return (
        <NavbarBS bg="danger" variant="dark" className="mb-3">
            <Container>
                <Nav className="mr-auto">
                    <LinkContainer exact to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/me" activeClassName="active">
                        <Nav.Link>My profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/invitations" activeClassName="active">
                        <Nav.Link>Invitations</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </NavbarBS>
    )
}