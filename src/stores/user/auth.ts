import {ref} from 'vue'
import {defineStore} from 'pinia'
import {removeCookie, setCookie} from 'typescript-cookie'
import {type Login, type User} from '@/types/user'

import router from '../../router'

import {useNotification} from '../usefull/notification'
import api from '@/helpers/api'

const notification = useNotification()

interface LoginResponse {
    access_token: string
    user: User
}

export const authStore = defineStore('authStore', () => {
    const user = ref<User>({
        login: ''
    })

    const login = async (user: Login) => {
        try {
            const {data} = await api.post<LoginResponse>('/user/login', user)


            if (data) {
                setCookie('lavita-token', data?.data?.token)
                user = {...data.user}

                notification.setNotif(true, 'Добро пожаловать', 'success')

                await router.push({name: 'warehouses'})
            }
        } catch (error: any) {
            console.log(error)
            notification.setNotif(true, error?.response?.data?.message, 'danger')
            //   ElMessage.warning(error.response?.data?.message)
        }
    }

    const checkUser = async () => {
        // closed for a while
        // try {
        //     const {data} = await api.get<User>('auth/checkuser')
        //     user.value = {...data}
        //     return true
        // } catch (error) {
        //     if (error.response.status == 403) {
        //         router.push({name: 'signIn'})
        //     }
        //     console.log(error)
        // }
    }

    const logout = () => {
        removeCookie('lavita-token')
        router.push({name: 'sign-in'})
    }

    return {
        user,
        logout,
        checkUser,
        login
    }
})
