import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// User card view
// Required props : 'data' (user object from server)
export default function UserCard({ data }) {
    return (
        <Card className="m-4 align-middle" style={{ width: '18rem', minHeight: '8.5rem', display: 'inline-block' }}>
            <Card.Body>
                <Card.Title>
                    <LinkContainer to={'/user/' + data.id}>
                        <Button variant="link" size="lg" className="p-0 m-0 text-dark" title={data.username}>
                            {data.first_name} {data.last_name}
                        </Button>
                    </LinkContainer>
                </Card.Title>

                <Card.Subtitle className="text-muted">
                    <ul className="list-inline">
                        {data.birth_date ?
                            <li className="list-inline-item">{new Date(data.birth_date).toLocaleDateString()}</li>
                            : null
                        }
                        {data.gender ?
                            <li className="list-inline-item">{data.gender === 'm' ? 'Male' : data.gender === 'f' ? 'Female' : 'Other'}</li>
                            : null
                        }
                        {data.location ?
                            <li className="list-inline-item">{data.location}</li>
                            : null
                        }
                    </ul>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}