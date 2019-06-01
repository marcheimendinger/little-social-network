import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaRetweet, FaAngry, FaFrownOpen, FaSmileBeam, FaFrown, FaMeh, FaSmile, FaMehBlank } from 'react-icons/fa'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'

import { post } from '../../API'

// Single post view with share button
// Required props : 'data' (post object from server)
export default function Post({ data }) {

    // Disable share button if the post has already been shared by the user
    const [shared, setShared] = useState(data.shared ? true : false)

    function postShare() {
        post('/post/share', { post_id: data.post_id })
        setShared(true)
    }

    function Share() {
        return (
            <Button variant="link" className="text-danger p-0" disabled={shared} onClick={postShare}>
                <FaRetweet className="mb-1" /> Share
            </Button>
        )
    }

    function Emotion({ tone }) {
        switch (tone) {
            case 'anger':
                return <FaAngry />
            case 'fear':
                return <FaFrownOpen />
            case 'joy':
                return <FaSmileBeam />
            case 'sadness':
                return <FaFrown />
            case 'analytical':
                return <FaMeh />
            case 'confident':
                return <FaSmile />
            case 'tentative':
                return <FaMehBlank />
            default:
                return null
        }
    }

    return (
        <Card className="my-4">
            <Card.Header>
                <ul className="list-inline mb-0">
                    {data.share_user_id ? (
                        <li className="list-inline-item">
                            <LinkContainer to={'/user/' + data.share_user_id}>
                                <Button variant="link" className="text-danger p-0" title={data.share_username}>
                                    <FaRetweet /> {data.share_first_name} {data.share_last_name}
                                </Button>
                            </LinkContainer>
                        </li>
                    ) : null}
                    <li className="list-inline-item">
                        <LinkContainer to={'/user/' + data.post_user_id}>
                            <Button variant="link" className="text-dark p-0" title={data.post_username}>
                                {data.post_first_name} {data.post_last_name}
                            </Button>
                        </LinkContainer>
                    </li>
                    {data.tone ? (
                        <li className="list-inline-item align-middle text-danger h5">
                            <Emotion tone={data.tone} />
                        </li>
                    ) : null}
                    <li className="list-inline-item align-middle">
                        <small className="text-muted"><ReactTimeAgo date={data.created} /></small>
                    </li>
                    <li className="list-inline-item float-right">
                        <Share />
                    </li>
                </ul>
            </Card.Header>
            <Card.Body>
                <Card.Text>{data.content}</Card.Text>
            </Card.Body>
        </Card>
    )
}