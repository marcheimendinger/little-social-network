import React from 'react'

// Error message view if no data to show
// Required prop : 'text'
export default function Error(props) {
    return (
        <h4 className="my-5 text-center">{props.text}</h4>
    )
}