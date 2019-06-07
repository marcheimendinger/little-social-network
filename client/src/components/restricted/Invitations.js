import React, { Fragment, useState, useEffect } from 'react'
import { Button, ListGroup, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'

import { getAndSet, post } from '../API'

import UserCard from './ui/UserCard'
import Error from './ui/Error'
import Loading from './ui/Loading'

// Invitations page with invitations from other users and recommandations
export default function Invitations() {

    const [loading, setLoading] = useState(true)

    const [invitations, setInvitations] = useState([])

    const [suggestions, setSuggestions] = useState([])

    async function handleAccept(user_id) {
        // Post the inviting user to accept invitation
        await post('/friend/accept', { user_id: user_id })
        // Get the invitations list (refresh)
        await getAndSet('/friend/invitations', null, setInvitations)
    }

    // Run once when component is mounted
    useEffect(() => {
        const fetch = async () => {
            // Get the invitations and suggestions lists
            await getAndSet('/friend/invitations', null, setInvitations)
            await getAndSet('/friend/suggestions', null, setSuggestions)
            setLoading(false)
        }
        fetch()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <Fragment>
            <h1 className="text-danger">
                Invitations
                {invitations.length > 0 ?
                    <small><Badge variant="danger" className="ml-3 align-top mt-2">{invitations.length}</Badge></small>
                :
                    null
                }
            </h1>

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