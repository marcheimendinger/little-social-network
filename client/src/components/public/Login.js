import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import API from '../API'
import Input from '../FormInput'

// Login form
// Inspiration :
// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms/
// https://www.taniarascia.com/crud-app-in-react-with-hooks/
export default function Login() {
    const [redirectToHome, setRedirectToHome] = useState(false)

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required()
            .min(5)
            .max(32),
        password: Yup.string()
            .required()
            .min(5)
            .max(100)
    })

    async function handleSubmit(values, actions) {
        try {
            // Post user's credentials
            await API.post('/user/login', {
                username: values.username,
                password: values.password
            })
            setRedirectToHome(true)
        } catch (e) {
            console.log(e)
            actions.setSubmitting(false)
            actions.setStatus({ error: 'Wrong username or password' })
        }
    }

    if (redirectToHome) {
        return <Redirect to="/" />
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    render= {({ handleSubmit, status }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            { status ? <Alert variant="danger">{status.error}</Alert> : null }
                            <Field name="username" id="usernameLogin" placeholder="Username" type="text" component={Input.String} />
                            <Field name="password" id="passwordLogin" placeholder="Password" type="password" component={Input.String} />
                            <Button type="submit" variant="outline-danger">Login</Button>
                        </Form>
                    )}
                />
            </Card.Body>
        </Card>
    )
}