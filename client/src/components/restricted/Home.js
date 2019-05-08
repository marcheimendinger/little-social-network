import React, { useState, useEffect, Fragment } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import API from '../API'

import Input from '../FormInput'
import Post from './ui/Post'

export default function Home() {
    
    // Publish a post

    const [refresh, setRefresh] = useState(false)

    const validationSchema = Yup.object().shape({
        post_content: Yup.string()
            .required()
            .max(500)
    })

    async function handleSubmit(values, actions) {
        try {
            await API.post('/post/publish', {
                post_content: values.post_content
            })
            actions.resetForm()
            setRefresh(!refresh)
        } catch (e) {
            console.log(e)
            actions.setSubmitting(false)
            actions.setStatus({ error: 'Error. Please retry.' })
        }
    }

    function Poster() {
        return (
            <Formik
                initialValues={{
                    post_content: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                render = {({ handleSubmit, status }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        { status ? <Alert variant="danger">{status.error}</Alert> : null }
                        <Field name="post_content" id="post-input" placeholder="What's up ?" component={Input.Textarea} />
                        <Button type="submit" variant="outline-danger">Post</Button>
                    </Form>
                )}
            />
        )
    }

    // Fetch feed

    const [feed, setFeed] = useState([])

    async function getFeed() {
        try {
            const results = await API.get('/post/feed', {
                params: {
                    paging: 0
                }
            })
            setFeed(results.data)
        } catch (e) {
            console.log(e)
        }
    }

    function Feed() {
        return (
            feed.map(post => (
                <Post key={"" + post.share_user_id + post.post_id} data={post} />
            ))
        )
    }

    // Run when component is mounted and `refresh` is updated
    useEffect(() => {
        getFeed()
    }, [refresh])

    return (
        <Fragment>
            <Poster />
            <Feed />
        </Fragment>
    )
}