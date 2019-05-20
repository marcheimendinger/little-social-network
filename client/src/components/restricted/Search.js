import React, { useState, Fragment } from 'react'
import { Form } from 'react-bootstrap'

import { getAndSet } from '../API'

import UserCard from './ui/UserCard'
import Error from './ui/Error'

export default function Search({ location }) {

    // const searchContent = new URLSearchParams(location.search).get('content')

    const [results, setResults] = useState([])

    const [emptyForm, setEmptyForm] = useState(true)

    // useEffect(() => {
    //     getAndSet('/user/search', { search_content: searchContent }, setResults)
    // }, [])

    function handleChange(event) {
        const content = event.target.value
        if (content !== '') {
            getAndSet('/user/search', { search_content: content }, setResults)
            setEmptyForm(false)
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
            {results[0] && !emptyForm ?
                results.map(user => (
                    <UserCard key={user.id} data={user} />
                ))
            : !emptyForm ?
                <Error text="Can't find a user with this name. Try another one !" />
            : null
            }
        </Fragment>
    )
}