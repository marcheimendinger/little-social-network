import Axios from 'axios'

export default Axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true,
    // Convert date from string to date object
    // Inspiration : https://mariusschulz.com/blog/deserializing-json-strings-as-javascript-date-objects
    transformResponse: [(data) => {
        return JSON.parse(data, (key, value) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
            if (typeof value === "string" && dateFormat.test(value)) {
                return new Date(value)
            }
            return value
        })
    }]
})