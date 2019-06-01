import React, { useState, Fragment } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import API from '../API'

import Input from '../FormInput'
import PostsList from './ui/PostsList'

export default function Home() {

    // Used to refresh the feed when the user posts
    const [refresh, setRefresh] = useState(false)

    const [isPosting, setIsPosting] = useState(false)

    // Run when post form is submitted
    async function handleSubmit(values, actions) {
        try {
            setIsPosting(true)
            await API.post('/post/publish', {
                post_content: values.post_content
            })
            actions.resetForm()
            setIsPosting(false)
            setRefresh(!refresh)
        } catch (e) {
            console.log(e)
            actions.setSubmitting(false)
            actions.setStatus({ error: 'Error. Please retry.' })
        }
    }

    // Validation schema for the post form
    const validationSchema = Yup.object().shape({
        post_content: Yup.string()
            .required()
            .max(500)
    })

    // Post form component
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
                        <Button type="submit" variant="outline-danger" disabled={isPosting}>{isPosting ? 'Posting...' : 'Post'}</Button>
                    </Form>
                )}
            />
        )
    }

    return (
        <Fragment>
            <Poster />
            <PostsList url='/post/feed' refresh={refresh} />
        </Fragment>
    )
}