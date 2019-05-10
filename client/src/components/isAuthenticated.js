import { useCookies } from 'react-cookie'

// Check if authentication cookie is present (true) or not (false)
export default function isAuthenticated() {
    const [cookies] = useCookies(['/'])
    return cookies['connect.sid'] !== undefined
}