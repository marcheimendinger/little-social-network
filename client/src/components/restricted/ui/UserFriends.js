import React, { useState, useEffect, Fragment } from 'react'

import { getAndSet } from '../../API'

import UserCard from './UserCard'
import Error from './Error'

// User friends (all or mutuals depending of the friendship if not 'me')
// Required prop :                                      'user_id'
// Required prop if 'user_id' is not equal to 'me' :    'friendship'
export default function UserFriends({ user_id, friendship }) {

    const [friends, setFriends] = useState([])

    // Run when component is mounted and when 'user_id' is updated
    useEffect(() => {
        if (user_id) {
            if (friendship === 'true' || user_id === 'me') {
                // Get user's friends list
                getAndSet('/friend/view', { user_id: user_id }, setFriends)
            } else {
                // Get user's mutual friends list
                getAndSet('/friend/mutuals', { user_id: user_id }, setFriends)
            }
        }
    }, [user_id])
    
    return (
        <Fragment>
            {friends[0] ?
                friends.map(user => (
                    <UserCard key={user.id} data={user} />
                ))
            :
                <Error text="No friend to show" />
            }
        </Fragment>
    )
}