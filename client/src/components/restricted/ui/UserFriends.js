import React from 'react'

import UserCard from './UserCard'

// User friends view
// Required props : 'data' (users array from server)
export default function UserFriends(props) {
    return (
        props.data.map(user => (
            <UserCard key={user.id} data={user} />
        ))
    )
}