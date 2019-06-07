import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaBirthdayCake, FaVenusMars, FaMapMarkerAlt } from 'react-icons/fa'

// User card
// Required prop : 'data' (user object from server)
export default function UserCard({ data }) {
    return (
        <Card className="m-4 align-middle" style={{ width: '18rem', minHeight: '12rem', display: 'inline-block' }}>
            <Card.Body>
                <Card.Title>
                    <LinkContainer to={'/user/' + data.id}>
                        <Button variant="link" size="lg" className="p-0 m-0 text-danger" title={data.username}>
                            {data.first_name} {data.last_name}
                        </Button>
                    </LinkContainer>
                </Card.Title>

                <Card.Body className="p-0">
                    <ul className="list-unstyled">
                        {data.birth_date ?
                            <li>
                                <FaBirthdayCake className="mb-1 text-danger lead" /> {new Date(data.birth_date).toLocaleDateString()}
                            </li>
                        :
                            null
                        }
                        {data.gender ?
                            <li>
                                <FaVenusMars className="mb-1 text-danger lead" /> {data.gender === 'm' ? 'Male' : data.gender === 'f' ? 'Female' : 'Other'}
                            </li>
                        :
                            null
                        }
                        {data.location ?
                            <li>
                                <FaMapMarkerAlt className="mb-1 text-danger lead" /> {data.location}
                            </li>
                        :
                            null
                        }
                    </ul>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}