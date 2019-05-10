import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// User card view
// Required props : 'data' (user object from server)
export default function UserCard(props) {
    return (
        <Card className="m-4 align-middle" style={{ width: '18rem', height: '8rem', display: 'inline-block' }}>
            <Card.Body>
                <Card.Title>
                    <LinkContainer to={'/user/' + props.data.id}>
                        <Button variant="link" size="lg" className="p-0 m-0 text-dark" title={props.data.username}>
                            {props.data.first_name} {props.data.last_name}
                        </Button>
                    </LinkContainer>
                </Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                    <ul className="list-inline">
                        {props.data.birth_date ?
                            <li className="list-inline-item">{new Date(props.data.birth_date).toLocaleDateString()}</li>
                            : null
                        }
                        {props.data.gender ?
                            <li className="list-inline-item">{props.data.gender === 'm' ? 'Male' : props.data.gender === 'f' ? 'Female' : 'Other'}</li>
                            : null
                        }
                        {props.data.location ?
                            <li className="list-inline-item">{props.data.location}</li>
                            : null
                        }
                    </ul>
                </Card.Subtitle>

                {/* <Card.Text>{props.data.description}</Card.Text> */}
            </Card.Body>
        </Card>
    )
}