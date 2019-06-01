import React, { useState, useEffect, Fragment } from 'react'
import { Button } from 'react-bootstrap'

import API from '../../API'

import Post from './Post'
import Error from './Error'
import Loading from './Loading'

// Post list with 'Show more' button
// Required prop :      'url' (for API request)
// Facultative props :  'user_id' (if 'url' = '/post/by')
//                      'refresh' (if you want the list to update when 'refresh' is updated)
export default function PostsList({ url, user_id, refresh }) {

    const [loading, setLoading] = useState(true)

    const [feed, setFeed] = useState([])

    // Feed buffer
    const [feedNextPage, setFeedNextPage] = useState([])

    const [paging, setPaging] = useState(1)

    async function getFeed(page) {
        try {
            setLoading(true)
            let resultsFeed = []
            if (page === 0) {
                // Get first page from server
                resultsFeed = await API.get(url, {
                    params: { paging: page, user_id: user_id }
                })
                setFeed(resultsFeed.data)
            } else {
                // Get new page from cache
                setFeed(feed.concat(feedNextPage))
            }
            setLoading(false)

            // Get next page in background
            const resultsFeedNext = await API.get(url, {
                params: { paging: page + 1, user_id: user_id }
            })
            setFeedNextPage(resultsFeedNext.data)
        } catch (e) {
            console.log(e)
        }
    }

    function updateFeed() {
        getFeed(paging)
        setPaging(paging + 1)
    }

    function Feed() {
        if (feed.length === 0) {
            return <Error text="No post to show" />
        }

        return (
            feed.map(post => (
                <Post key={"" + post.share_user_id + post.post_id} data={post} />
            ))
        )
    }

    function ShowMoreButton() {
        if (feedNextPage.length === 0) {
            return null
        }

        return (
            <Button variant="danger" className="mx-auto d-block" onClick={updateFeed}>Show more</Button>
        )
    }

    // Run when component is mounted and when 'refresh' is updated
    useEffect(() => {
        getFeed(0)
        setPaging(1)
    }, [refresh])

    if (loading) {
        return <Loading />
    }

    return (
        <Fragment>
            <Feed />
            <ShowMoreButton />
        </Fragment>
    )
    
}