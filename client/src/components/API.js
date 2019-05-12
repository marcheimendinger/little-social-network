import Axios from 'axios'

const API = Axios.create({
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

// Shortcut to get data from 'url' with some queries parameters ('params')
// and store the results in a hook via the 'storingFunction'
async function getAndSet(url, params, storingFunction) {
    try {
        const results = await API.get(url, { params: params })
        storingFunction(results.data)
    } catch (e) {
        console.log(e)
    }
}

// Shortcut to post 'data' to 'url'
async function post(url, data) {
    try {
        await API.post(url, data)
    } catch (e) {
        console.log(e)
    }
}

export default API
export { getAndSet, post }