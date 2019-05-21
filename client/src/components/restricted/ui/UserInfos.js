import React, { Fragment, useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { FaPen, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt } from 'react-icons/fa'

import { post } from '../../API'

// User main informations view
// Required props : 'data' (user object from server)
// Facultative props : 'edit' (boolean to true) to enable edition button
export default function UserInfos({ data, edit }) {
    const [invited, setInvited] = useState(false)

    useEffect(() => {
        // Disable 'Ask to become friends' button if invitation already sent
        setInvited(data.friendship === 'pending')
    }, [data])

    async function invite() {
        await post('/friend/invite', { user_id: data.id })
        setInvited(true)
    }

    return (
        <Fragment>
            <ul className="list-inline mb-0">
                <li className="list-inline-item h1 text-danger">
                    {data.first_name} {data.last_name}
                </li>
                <li className="list-inline-item h2 text-muted">
                    @{data.username}
                </li>
                <li className="float-right">
                    {edit ?
                        <LinkContainer to="/me/edit" title="Edit my profile">
                            <Button variant="outline-danger" className="mt-2">Edit my profile <FaPen className="ml-2 mb-1" /></Button>
                        </LinkContainer>
                    : data.friendship === 'true' ?
                        <Button variant="outline-danger" className="mt-2" disabled>You are friends</Button>
                    :
                        <Button variant="outline-danger" className="mt-2" disabled={invited} onClick={invite}>Ask to become friends</Button>
                    }
                </li>
            </ul>

            <ul className="list-inline">
                {data.birth_date ?
                    <li className="list-inline-item"><FaBirthdayCake className="mb-1 text-danger lead" /> {new Date(data.birth_date).toLocaleDateString()}</li>
                :
                    null
                }
                {data.gender ?
                    <li className="list-inline-item"><FaVenusMars className="mb-1 text-danger lead" /> {data.gender === 'm' ? 'Male' : data.gender === 'f' ? 'Female' : 'Other'}</li>
                :
                    null
                }
                {data.location ?
                    <li className="list-inline-item"><FaMapMarkerAlt className="mb-1 text-danger lead" /> {data.location}</li>
                :
                    null
                }
            </ul>

            {data.description ?
                <p className="lead">{data.description}</p>
            :
                null
            }

            <p className="text-muted small">Member since {new Date(data.created).toDateString()}</p>
        </Fragment>
    )
}