import React, { useState, Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import API from '../API'
import Input from '../FormInput'

import Loading from './ui/Loading'

// Edit my profile page with pre-filled form containing current data
export default function MeEdit() {
    const [initialValues, setInitialValues] = useState({})

    const [redirectToProfile, setRedirectToProfile] = useState(false)

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
        birth_date: Yup.date(),
        gender: Yup.string()
            .matches(/(m|f|o)/),
        location: Yup.string()
            .max(50),
        description: Yup.string()
            .max(500),
        email: Yup.string()
            .email()
            .required()
            .max(50),
        password: Yup.string()
            .min(5)
            .max(100)
    })

    async function handleSubmit(values, actions) {
        try {
            // Post new user's infos
            await API.post('/user/update', {
                username: values.username,
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                birth_date: values.birth_date,
                gender: values.gender,
                location: values.location,
                description: values.description
            })
            setRedirectToProfile(true)
        } catch (e) {
            console.log(values)
            console.log(e)
            actions.setSubmitting(false)
            actions.setStatus({ error: 'Please retry, something went wrong with the server.' })
        }
    }

    // Run once when component is mounted
    useEffect(() => {
        // Get current user's infos
        async function getAndSet() {
            try {
                const results = await API.get('/user/view', { params: { user_id: 'me' } })
                let data = results.data
                // Prevent Formik error if value is null
                Object.keys(data).map((key) => {
                    if (data[key] === null) {
                        data[key] = ''
                    }
                    return data[key]
                })
                setInitialValues(data)
            } catch (e) {
                console.log(e)
            }
        }
        getAndSet()
    }, [])

    if (redirectToProfile) {
        return <Redirect to="/me" />
    }

    return (
        <Fragment>
            <h1 className="text-danger mb-4">Edit my profile</h1>

            {!initialValues.username ?
                <Loading />
            :
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    render = {({ handleSubmit, status, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            { status ? <Alert variant="danger">{status.error}</Alert> : null }
                            <Field name="username" id="usernameEdit" label="Username" type="text" component={Input.String} />
                            <Field name="first_name" id="first_nameEdit" label="First name" type="text" component={Input.String} />
                            <Field name="last_name" id="last_nameEdit" label="Last name" type="text" component={Input.String} />
                            <Field name="birth_date" id="birthDateEdit" label="Birth date" setFieldValue={setFieldValue} component={Input.Date} />
                            <Field name="gender" id="genderEdit" label="Gender" options={{'f': 'Female', 'm': 'Male', 'o': 'Other', '': 'Don\'t want to say'}} component={Input.Radio} />
                            <Field name="location" id="locationEdit" label="Location" type="text" component={Input.String} />
                            <Field name="description" id="descriptionEdit" label="Description" rows={3} component={Input.Textarea} />
                            <Field name="email" id="emailEdit" label="Email (private)" type="email" component={Input.String} />
                            <Field name="password" id="passwordEdit" label="New password" placeholder="∙∙∙∙∙∙∙∙" type="password" component={Input.String} />
                            <Button type="submit" variant="outline-danger">Update</Button>
                        </Form>
                    )}
                />
            }
        </Fragment>
    )
}