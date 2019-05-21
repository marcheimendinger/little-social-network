import React from 'react'

// Error message view if no data to show
// Required prop : 'text'
export default function Error({ text }) {
    return (
        <h4 className="my-5 text-center">{text}</h4>
    )
}