import React, { useState, useEffect, Fragment } from 'react'

import API from "../API"

import UserInfos from './ui/UserInfos'
import UserPosts from './ui/UserPosts'
import UserFriends from './ui/UserFriends'

export default function Me() {

    const [infos, setInfos] = useState({})

    const [posts, setPosts] = useState([])

    const [friends, setFriends] = useState([])

    // Fetch user's main informations
    async function getUser() {
        try {
            const results = await API.get('/user/view', {
                params: {
                    user_id: "me"
                }
            })
            setInfos(results.data)
        } catch (e) {
            console.log(e)
        }
    }

    // Fetch user's posts
    async function getPosts(paging) {
        try {
            const results = await API.get('/post/by', {
                params: {
                    user_id: "me",
                    paging: paging
                }
            })
            setPosts(results.data)
        } catch (e) {
            console.log(e)
        }
    }

    // Fetch user's friends
    async function getFriends() {
        try {
            const results = await API.get('/friend/view', {
                params: {
                    user_id: "me"
                }
            })
            setFriends(results.data)
        } catch (e) {
            console.log(e)
        }
    }

    // Run once when component is mounted
    useEffect(() => {
        getUser()
        getPosts(0)
        getFriends()
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