import React from 'react'
import { Spinner } from 'react-bootstrap'

// Loading animation
export default function Loading() {
    return (
        <div className="text-center">
            <Spinner animation="grow" className="mt-5 mb-3 text-danger" />
            <p className="small">Loading...</p>
        </div>
    )
}