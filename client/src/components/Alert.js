import React from 'react'

// Show an alert if 'type' and 'text' props are defined
export default function Alert(props) {
    if (!props.type || !props.text) return null

    return (
        <p style={{color:'red'}}>
            {props.text}
        </p>
    )
}