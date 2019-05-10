import React, { useState, useEffect, Fragment } from 'react'

import { getAndSet } from '../../API'

import Post from './Post'

// User posts fetch and view
// Required props : 'user_id'
export default function UserPosts(props) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (props.user_id) {
            getAndSet('/post/by', { user_id: props.user_id, paging: 0 }, setPosts)
        }
    }, [props])

    return (
        <Fragment>
            {posts[0] ?
                posts.map(post => (
                    <Post key={"" + post.share_user_id + post.post_id} data={post} />
                ))
            :
                <h4 className="mt-5 text-center">Nothing to show</h4>
            }
        </Fragment>
    )
}