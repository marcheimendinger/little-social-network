import React, { useState, useEffect, Fragment } from 'react'
import { Tab, Nav } from 'react-bootstrap'

import { getAndSet } from "../API"

import UserInfos from './ui/UserInfos'
import UserFriends from './ui/UserFriends'
import PostsList from './ui/PostsList'
import Loading from './ui/Loading';

export default function Me() {

    const [infos, setInfos] = useState({})

    // Run once when component is mounted
    useEffect(() => {
        getAndSet('/user/view', { user_id: "me" }, setInfos)
    }, [])

    if (!infos.username) {
        return <Loading />
    }
    
    return (
        <Fragment>
            <UserInfos data={infos} edit={true} />

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
                        <PostsList url='/post/by' user_id="me" />
                    </Tab.Pane>
                    <Tab.Pane eventKey="friends">
                        <UserFriends user_id="me" />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Fragment>
    )
}