import React from 'react'
import { FaSkullCrossbones } from 'react-icons/fa'

// Not found page
export default function NotFound() {
    return(
        <div className="text-center">
            <h1 className="text-danger display-1 mb-4"><FaSkullCrossbones /></h1>
            <h1>Not found</h1>
        </div>
    )
}