import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import type { setUser, getUser } from '@/types/user'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'

type Response = GetAll & {
  data: getUser[]
}

type ParamsUser = Params & {
  department?: string
}

export const userStore = defineStore('userStore', () => {
  const users = ref<getUser[]>([])
  const users_count = ref<number>(0)
  const users_page = ref<number>(1)
  const responsibleUser = ref<[]>([])

  const userList = ref<getUser[]>([])
  const notification = useNotification()


  const getUserList = async (params: any) => {
    const { data } = await api.get<Response>('/user/', { params })

    userList.value = data.data
  }

  const getAllUsers = async (params: ParamsUser) => {
    users.value = []

    const { data } = await api.get<Response>('/user/', { params })

    users.value = [...data.data]

    users_count.value = data.pagination.totalCount
    users_page.value = data.pagination.pageCount
  }

  const addUser = async (user: setUser) => {
    console.log(user)

    const { data } = await api.post<getUser>('user/create', user)
    users.value = [data, ...users.value]
    users_count.value += 1
    notification.setNotif(true, 'Добавлено', 'success')
  }

  const getResponsibleUser = async (params: any) => {
    const { data } = await api.get('/user/', { params })
    responsibleUser.value = data.data
  }

  return {
    users,
    users_count,
    addUser,
    getAllUsers,
    getResponsibleUser,
    responsibleUser,

    getUserList,
    userList
  }
})
