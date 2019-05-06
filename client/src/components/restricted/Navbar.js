import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <ul>
            <li><Link to="/search">Search</Link></li>
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to ="/me" activeClassName="active">My profile</NavLink></li>
            <li><NavLink to ="/invitations" activeClassName="active">Invitations</NavLink></li>
        </ul>
    )
}