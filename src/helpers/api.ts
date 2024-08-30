import router from '@/router'
import axios, {type AxiosInstance} from 'axios'
import {getCookie} from 'typescript-cookie'

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL,

    headers: {
        'Content-type': 'application/json',
        'x-access-token': getCookie('lavita-token')
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const token = getCookie('lavita-token') // Get your cookie value

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}` // Add the cookie to the header if necessary
        }
        return config
    },
    (error) => {
        if (error.code.status == 401) {
            router.push({name: 'signIn'})
        }
        return Promise.reject(error)
    }
)

export default apiClient
