import React, { useState, useEffect, Fragment } from 'react'

import { getAndSet } from '../../API'

import UserCard from './UserCard'

// User friends (all or mutuals depending of the friendship) fetch and view
// Required props : 'user_id'
export default function UserFriends(props) {

    const [friends, setFriends] = useState([])

    useEffect(() => {
        if (props.user_id) {
            if (props.is_friend || props.user_id === 'me') {
                getAndSet('/friend/view', { user_id: props.user_id }, setFriends)
            } else {
                getAndSet('/friend/mutuals', { user_id: props.user_id }, setFriends)
            }
        }
    }, [props])
    
    return (
        <Fragment>
            {friends[0] ?
                friends.map(user => (
                    <UserCard key={user.id} data={user} />
                ))
            :
                <h4 className="mt-5 text-center">Nothing to show</h4>
            }
        </Fragment>
    )
}