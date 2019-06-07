import React from 'react'
import { Form } from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

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

// Generate date picker input in a form
// Required props : 'name', 'id' (need to be unique in DOM !) and 'setFieldValue' (function from Formik)
// Facultative props : 'label'
// /!\ Currently doesn't show any error warning
function Date({
    field,
    ...props}) {
    return (
        <Form.Group controlId={props.id}>
            {props.label ? <Form.Label>{props.label}</Form.Label> : null}
            <br />
            <DayPickerInput
                {...field}
                value={field.value}
                onDayChange={day => props.setFieldValue(field.name, day)}
                component={Form.Control}
            />
        </Form.Group>
    )
}

// Generate radio check boxes input in a form
// Required props : 'name', 'id' (need to be unique in DOM !), 'label' and 'options' (object of possibilities with the pattern {'value':'label'} )
function Radio({
    field,
    ...props}) {
    return (
        <Form.Group controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <br />
            {Object.keys(props.options).map((key) => {
                return <Form.Check
                    {...field}
                    type="radio"
                    inline
                    defaultChecked={field.value === key}
                    label={props.options[key]}
                    key={props.id + props.options[key]}
                    value={key}
                    id={props.id + key}
                />
            })}
        </Form.Group>
    )
}

export default { String, Textarea, Date, Radio }