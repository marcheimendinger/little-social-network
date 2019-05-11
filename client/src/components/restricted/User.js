import React, { useEffect, useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Tab, Nav } from 'react-bootstrap'

import { getAndSet } from '../API'

import UserInfos from './ui/UserInfos'
import UserPosts from './ui/UserPosts'
import UserFriends from './ui/UserFriends'

export default function User({ match }) {

    const [infos, setInfos] = useState({ checker: true })

    useEffect(() => {
        getAndSet('/user/view', { user_id: match.params.user_id }, setInfos)
    }, [match.params.user_id])

    // Redirect to '/me' page if it's the authenticated user
    if (!infos.checker && infos.is_me === true) {
        return <Redirect to="/me" />
    }

    if (!infos.checker && !infos.username) {
        return <h1>This user doesn't exist</h1>
    }

    return (
        <Fragment>
            <UserInfos data={infos} />

            {infos.is_friend ?
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
                            <UserPosts user_id={infos.id} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="friends">
                            <UserFriends user_id={infos.id} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            :
                <Fragment>
                    <h3 className="text-danger">Mutual friends</h3>
                    <UserFriends user_id={infos.id} />
                </Fragment>
            }
        </Fragment>
    )
}