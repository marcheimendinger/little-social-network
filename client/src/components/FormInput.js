import React from 'react'
import { Form } from 'react-bootstrap'

// To use as the 'component' prop in the 'Field' component from Formik
// Inspiration : https://jaredpalmer.com/formik/docs/api/field

// Generate string input in a form
// Required props : 'name', 'id' (need to be unique in DOM !) and 'type'
// Facultative props : 'label', 'placeholder' and 'disableError' (boolean)
function String({
    field,
    form: { touched, errors },
    ...props}) {
    return (
        <Form.Group controlId={props.id}>
            {props.label ? <Form.Label>{props.label}</Form.Label> : null}
            <Form.Control
                {...field}
                type={props.type}
                placeholder={props.placeholder}
                isValid={touched[field.name] && !errors[field.name] && !props.disableError}
                isInvalid={touched[field.name] && errors[field.name] && !props.disableError}
            />
            <Form.Control.Feedback type="invalid">
                {errors[field.name]}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

// Generate textarea input in a form
// Required props : 'name', 'id' (need to be unique in DOM !) and 'rows'
// Facultative props : 'label', 'placeholder' and 'disableError' (boolean)
function Textarea({
    field,
    form: { touched, errors },
    ...props}) {
    return (
        <Form.Group controlId={props.id}>
            {props.label ? <Form.Label>{props.label}</Form.Label> : null}
            <Form.Control
                {...field}
                as="textarea"
                rows={props.rows}
                placeholder={props.placeholder}
                isValid={touched[field.name] && !errors[field.name] && !props.disableError}
                isInvalid={touched[field.name] && errors[field.name] && !props.disableError}
            />
            <Form.Control.Feedback type="invalid">
                {errors[field.name]}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default { String, Textarea }