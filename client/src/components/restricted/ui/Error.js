import React from 'react'

// Error message if no data to show
// Required prop : 'text' (error message)
export default function Error({ text }) {
    return (
        <h4 className="my-5 text-center">{text}</h4>
    )
}