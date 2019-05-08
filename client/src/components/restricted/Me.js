import React, { useState, useEffect, Fragment } from 'react'

import { getAndSet } from "../API"

import UserInfos from './ui/UserInfos'
import UserPosts from './ui/UserPosts'
import UserFriends from './ui/UserFriends'

export default function Me() {

    const [infos, setInfos] = useState({})

    const [posts, setPosts] = useState([])

    const [friends, setFriends] = useState([])

    // Run once when component is mounted
    useEffect(() => {
        getAndSet('/user/view', { user_id: "me" }, setInfos)
        getAndSet('/post/by', { user_id: "me", paging: 0 }, setPosts)
        getAndSet('/friend/view', { user_id: "me" }, setFriends)
    }, [])

    return (
        <Fragment>
            <UserInfos data={infos} edit={true} />
            <hr className="my-4" />
            <h2 className="text-danger">Latest posts</h2>
            <UserPosts data={posts} />
            <hr className="my-4" />
            <h2 className="text-danger">Friends</h2>
            <UserFriends data={friends} />
        </Fragment>
    )
}