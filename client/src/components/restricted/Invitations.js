import React, { Fragment, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { getAndSet, post } from '../API'

import UserCard from './ui/UserCard'

export default function Invitations() {

    const [invitations, setInvitations] = useState([])

    const [suggestions, setSuggestions] = useState([])

    const [refresh, setRefresh] = useState(false)

    async function handleAccept(user_id) {
        await post('/friend/accept', { user_id: user_id })
        setRefresh(!refresh)
    }

    // Run when component is mounted and `refresh` is updated
    useEffect(() => {
        getAndSet('/friend/invitations', null, setInvitations)
        getAndSet('/friend/suggestions', null, setSuggestions)
    }, [refresh])

    return (
        <Fragment>
            <h1 className="text-danger">Invitations</h1>

            {invitations[0] ?
                <ul className="list-group list-group-flush mb-4">
                    {invitations.map(invitation => (
                        <li key={invitation.user_id} className="list-group-item">
                            <LinkContainer to={'/user/' + invitation.user_id}>
                                <Button variant="link" className="text-dark" title={invitation.username}>
                                    {invitation.first_name} {invitation.last_name}
                                </Button>
                            </LinkContainer>
                            <small className="text-muted">on {new Date(invitation.invitation_created).toDateString()}</small>
                            <Button variant="outline-danger" className="float-right" onClick={() => handleAccept(invitation.user_id)}>Accept</Button>
                        </li>
                    ))}
                </ul>
            :
                <h4 className="my-5 text-center">No pending invitation</h4>
            }

            <h1 className="text-danger">Suggestions</h1>

            {suggestions[0] ?
                suggestions.map(user => (
                    <UserCard key={user.id} data={user} />
                ))
            :
                <h4 className="my-5 text-center">Sorry, impossible to show you some suggestions... :-(<br />
                Add some friends to help us !</h4>
            }

        </Fragment>
    )
}