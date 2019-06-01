import React, { useState, Fragment } from 'react'
import { Form } from 'react-bootstrap'

import { getAndSet } from '../API'

import UserCard from './ui/UserCard'
import Error from './ui/Error'
import Loading from './ui/Loading'

// Search page with a real time form getting data on each key stroke
export default function Search() {

    const [loading, setLoading] = useState(false)

    const [results, setResults] = useState([])

    const [emptyForm, setEmptyForm] = useState(true)

    async function handleChange(event) {
        const content = event.target.value
        if (content !== '') {
            setEmptyForm(false)
            setLoading(true)
            // Get search results
            await getAndSet('/user/search', { search_content: content }, setResults)
            setLoading(false)
        } else {
            setEmptyForm(true)
        }
    }

    return (
        <Fragment>
            <h1 className="text-danger">Search</h1>
            <Form className="mt-4">
                <Form.Control type="text" placeholder="Type a name..." className="mr-sm-2" size="lg" onChange={handleChange} autoFocus />
            </Form>
            {loading && !emptyForm ?
                <Loading />
            : results[0] && !emptyForm ?
                results.map(user => (
                    <UserCard key={user.id} data={user} />
                ))
            : !results[0] && !emptyForm ?
                <Error text="Can't find a user with this name. Try another one !" />
            : null
            }
        </Fragment>
    )
}