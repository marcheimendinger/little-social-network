import React from 'react'
import { Form } from 'react-bootstrap'

// Generate all necessary code for a string input in a form
// To use as the 'component' prop in the 'Field' component from Formik
// Required props : 'name', 'placeholder' and 'type'
// Inspiration : https://jaredpalmer.com/formik/docs/api/field
function String({
    field,
    form: { touched, errors },
    ...props}) {
    return (
        <Form.Group controlId={field.name} >
            <Form.Label>{props.placeholder}</Form.Label>
            <Form.Control
                {...field}
                type={props.type}
                isValid={touched[field.name] && !errors[field.name]}
                isInvalid={touched[field.name] && errors[field.name]}
            />
            <Form.Control.Feedback type="invalid">
                {errors[field.name]}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default { String }