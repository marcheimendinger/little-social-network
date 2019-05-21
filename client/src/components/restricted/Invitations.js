import React, { Fragment, useState, useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'

import { getAndSet, post } from '../API'

import UserCard from './ui/UserCard'
import Error from './ui/Error'

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
                <ListGroup variant="flush" className="mb-4">
                    {invitations.map(invitation => (
                        <ListGroup.Item key={invitation.user_id}>
                            <LinkContainer to={'/user/' + invitation.user_id}>
                                <Button variant="link" className="text-dark" title={invitation.username}>
                                    {invitation.first_name} {invitation.last_name}
                                </Button>
                            </LinkContainer>
                            <small className="text-muted"><ReactTimeAgo date={invitation.invitation_created} /></small>
                            <Button variant="outline-danger" className="float-right" onClick={() => handleAccept(invitation.user_id)}>Accept</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            :
                <Error text="No pending invitation" />
            }

            <h1 className="text-danger">Suggestions</h1>

            {suggestions[0] ?
                suggestions.map(user => (
                    <UserCard key={user.id} data={user} />
                ))
            :
                <Error text="Sorry, impossible to show you some suggestions... Add some friends to help us !" />
            }

        </Fragment>
    )
}