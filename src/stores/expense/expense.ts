import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
import { type Comment } from '../../types/production/proInvoice'
import type { Movement } from '@/types/invoice/movement'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'
import router from '../../router'
import type { getProductPack } from '@/types/production/productpack'

export const expenseStore = defineStore('expenseStore', () => {
  const markups = ref([])
  const expenseList = ref([])
  const warehouse = ref({
    containers: [],
    parts: [],
    products: []
  })
  const expense_count = ref({
    page: 1,
    total_count: 0,
    total_pages: 0
  })

  const commentsList = ref([])
  const logtsList = ref([])

  const notification = useNotification()

  const addFileExpense = async ({ id, files }) => {
    return await api.post(`/expense/${id}/update_photos/`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const getMarkupById = async ({ product_id, warehouse_id }) => {
    const { data } = await api.get<Response>(
      `/product/${product_id}/markups/from_warehouse/${warehouse_id}/`
    )

    markups.value = data
  }

  const getWarehouseById = async (id: number | string) => {
    const { data } = await api.get<Response>(`/warehouse/${id}/`)

    warehouse.value = data
  }

  const getAllExpense = async (params) => {
    const { data } = await api.get<Response>('/expense/', { params })

    expenseList.value = data.data
    expense_count.value = data.pagination
  }

  const addExpense = async (expenseData) => {
    return await api.post<Movement>('expense/', expenseData)
    console.log(data)

    // router.push({ name: 'showExpense', params: { id: data.id } })
    // notification.setNotif(true, 'Добавлено', 'success')
  }

  const getMovement = async (id: string) => {
    return await api.get<Movement>(`movement/${id}`)
  }

  const saveMovement = async (proImovement: Movement) => {
    await api.put('movement/update', proImovement)
    notification.setNotif(true, 'Статус обновлено!', 'info')
    await router.push({ name: 'movements' })
  }

  const addComment = async (params) => {
    console.log(params.text, 'dsa')
    console.log(params, 'dsa')
    return await api.post<Comment>(`/expense/${params.params.invoice_id}/add_comment/`, {
      text: params.text
    })
  }

  const getExpense = async (expense_id: any) => {
    return await api.get(`/expense/${expense_id.expense_id}/`)
  }

  const getInComment = async (params) => {
    const { data } = await api.get<Response>(`/expense/${params.invoice_id}/comments/`)

    commentsList.value = data
  }

  const getInLogs = async (params) => {
    const { data } = await api.get<Response>(`/expense/${params.invoice_id}/logs/`)

    logtsList.value = data
  }

  return {
    expenseList,
    expense_count,
    warehouse,
    markups,
    logtsList,
    commentsList,
    getAllExpense,
    addComment,
    getMarkupById,
    getWarehouseById,
    addFileExpense,
    addExpense,
    getInLogs,
    getInComment,
    getExpense
  }
})
