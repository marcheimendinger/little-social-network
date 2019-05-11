import React, { useState, Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

// Not used for the moment... just an idea to include the search form in the navbar
// DOESNT'T WORK YET
export default function SearchForm(props) {

    const [searchContent, setSearchContent] = useState("")

    const [startSearch, setStartSearch] = useState(false)

    function handleChange(event) {
        const content = event.target.value
        setSearchContent(content)
    }

    function handleSubmit() {
        if (searchContent !== "" && !startSearch) {
            setSearchContent("")
            setStartSearch(true)
        }
    }

    // useEffect(() => {
    //     if (props.location.pathname === '/search') {
    //         setStartSearch(false)
    //     }
    //     console.log(props.location.pathname)
    //     console.log(startSearch)
    // }, [props])

    return (
        <Fragment>
            <Form inline className="ml-3" onSubmit={handleSubmit}>
                <Form.Control type="text" placeholder="Search a user" className="mr-sm-2" size="sm" onChange={handleChange} />
                <Button variant="outline-light" size="sm" type="submit">Search</Button>
            </Form>
            {startSearch ?
                <Redirect to={{ pathname: "/search", search: `?content=${searchContent}` }} />
            : null}
        </Fragment>
    )
}