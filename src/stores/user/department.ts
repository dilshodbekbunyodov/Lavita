import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { type Department } from '@/types/user'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'

type Response = GetAll & {
  data: Department[]
}

export const departmentStore = defineStore('departmentStore', () => {
  const departments = ref<Department[]>([])
  const departments_count = ref<number>(0)
  const departments_page = ref<number>(1)
  const notification = useNotification()

  const getAllDepartments = async (params: Params) => {
    const { data } = await api.get<Response>('department/all', { params })

    departments.value = [...data.data]
    departments_count.value = data.pagination.totalCount
    departments_page.value = data.pagination.pageCount
  }

  const addDepartment = async (department: Department) => {
    const { data } = await api.post<Department>('department/create', department)
    departments.value = [data, ...departments.value]
    departments_count.value += 1
    notification.setNotif(true, 'Добавлено', 'success')
  }

  return {
    departments,
    departments_count,
    addDepartment,
    getAllDepartments
  }
})
