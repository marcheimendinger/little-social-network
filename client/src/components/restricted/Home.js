import React, { useState, useEffect, Fragment } from 'react'

import API from '../API'

import Post from './ui/Post'

export default function Home() {

    const [feed, setFeed] = useState([])

    async function getFeed() {
        try {
            const results = await API.get('/post/feed')
            setFeed(results.data)
        } catch (e) {
            console.log(e)
        }
    }

    function Feed() {
        return (
            feed.map(post => (
                <Post key={"" + post.share_user_id + post.post_id} data={post} />
            ))
        )
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        <Fragment>
            <h1>Home</h1>
            <Feed />
        </Fragment>
    )
}