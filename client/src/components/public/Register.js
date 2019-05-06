import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import API from '../API'
import Input from '../FormInput'

export default function Register() {
    const [redirectToHome, setRedirectToHome] = useState(false)

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required()
            .min(5)
            .max(32),
        first_name: Yup.string()
            .required()
            .min(2)
            .max(50),
        last_name: Yup.string()
            .required()
            .min(2)
            .max(50),
        email: Yup.string()
            .email()
            .required()
            .max(50),
        password: Yup.string()
            .required()
            .min(5)
            .max(100)
    })

    async function handleSubmit(values, actions) {
        try {
            await API.post('/user/register', {
                username: values.username,
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password
            })
            setRedirectToHome(true)
        } catch (e) {
            console.log(e)
            actions.setSubmitting(false)
            actions.setStatus({ error: 'Please retry, something went wrong with the server.' })
        }
    }

    if (redirectToHome) {
        return <Redirect to="/" />
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Register</Card.Title>
                <Formik
                    initialValues={{
                        username: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    render = {({ handleSubmit, status }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            { status ? <Alert variant="danger">{status.error}</Alert> : null }
                            <Field name="username" id="usernameRegister" placeholder="Username" type="text" component={Input.String} />
                            <Field name="first_name" id="first_nameRegister" placeholder="First name" type="text" component={Input.String} />
                            <Field name="last_name" id="last_nameRegister" placeholder="Last name" type="text" component={Input.String} />
                            <Field name="email" id="emailRegister" placeholder="Email" type="email" component={Input.String} />
                            <Field name="password" id="passwordRegister" placeholder="Password" type="password" component={Input.String} />
                            <Button type="submit">Register</Button>
                        </Form>
                    )}
                />
            </Card.Body>
        </Card>
    )
}