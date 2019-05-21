import React, { useState, useEffect, Fragment } from 'react'

import { getAndSet } from '../../API'

import UserCard from './UserCard'
import Error from './Error'

// User friends (all or mutuals depending of the friendship if not 'me') fetch and view
// Required props : 'user_id'
// Required props if 'user_id' is equal to 'me' : 'friendship'
export default function UserFriends({ user_id, friendship }) {

    const [friends, setFriends] = useState([])

    useEffect(() => {
        if (user_id) {
            if (friendship === 'true' || user_id === 'me') {
                getAndSet('/friend/view', { user_id: user_id }, setFriends)
            } else {
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