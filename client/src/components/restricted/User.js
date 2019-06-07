import React, { useEffect, useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Tab, Nav } from 'react-bootstrap'

import { getAndSet } from '../API'

import UserInfos from './ui/UserInfos'
import UserFriends from './ui/UserFriends'
import PostsList from './ui/PostsList'
import NotFound from './NotFound'
import Loading from './ui/Loading'

// User page with its infos
// If it is a friend, also posts and friends
// If it is not a friend, also mutual friends
// Required prop : 'match' (provided by react-router-dom) containing 'user_id'
export default function User({ match }) {

    const [infos, setInfos] = useState({ checker: true })

    // Run when component is mounted and when 'match.params.user_id' is updated
    useEffect(() => {
        // Get user's infos
        getAndSet('/user/view', { user_id: match.params.user_id }, setInfos)
    }, [match.params.user_id])

    if (infos.checker && !infos.username) {
        return <Loading />
    }

    // Redirect to '/me' page if it's the authenticated user
    if (!infos.checker && infos.is_me === true) {
        return <Redirect to="/me" />
    }

    if (!infos.checker && !infos.username) {
        return <NotFound />
    }

    return (
        <Fragment>
            <UserInfos data={infos} />

            {infos.friendship === 'true' ?
                <Tab.Container defaultActiveKey="posts" transition={false}>
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="posts">Posts</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="friends">Friends</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="posts">
                            <PostsList url='/post/by' user_id={infos.id} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="friends">
                            <UserFriends user_id={infos.id} friendship={infos.friendship} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            :
                <Fragment>
                    <h3 className="text-danger">Mutual friends</h3>
                    <UserFriends user_id={infos.id} friendship={infos.friendship} />
                </Fragment>
            }
        </Fragment>
    )
}