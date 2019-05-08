import React from 'react'

import Post from './Post'

// User posts view
// Required props : 'data' (posts array from server)
export default function UserPosts(props) {
    return (
        props.data.map(post => (
            <Post key={"" + post.share_user_id + post.post_id} data={post} />
        ))
    )
}