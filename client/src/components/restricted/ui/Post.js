import React from 'react'
import { Card } from 'react-bootstrap'
import { FaRetweet } from 'react-icons/fa'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'

export default function Post(props) {
    return (
        <Card className="m-4">
            <Card.Header>
                <ul className="list-inline mb-0">
                    {props.data.share_user_id ? (
                        <li className="list-inline-item text-info">
                            <FaRetweet /> {props.data.share_first_name} {props.data.share_last_name}
                        </li>
                    ) : null}
                    <li className="list-inline-item">
                        {props.data.post_first_name} {props.data.post_last_name}
                    </li>
                    <li className="list-inline-item">
                        <small className="text-muted"><ReactTimeAgo date={props.data.created} /></small>
                    </li>
                </ul>
            </Card.Header>
            <Card.Body>
                <Card.Text>{props.data.content}</Card.Text>
            </Card.Body>
        </Card>
    )
}