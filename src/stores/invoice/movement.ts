import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
import { type Comment } from '../../types/production/proInvoice'
import type { Movement } from '@/types/invoice/movement'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'
import router from '../../router'
import type { getProductPack } from '@/types/production/productpack'

type Response = GetAll & {
  data: Movement[]
}

type ResponseProductPack = GetAll & {
  data: getProductPack[]
}

type MovementParams = Params & {
  warehouse?: string
}

interface Pagination {
  page: number
  total_count: number | null
  total_pages: number | null
}

export const movementStore = defineStore('movementStore', () => {
  const movements = ref<Movement[]>([])
  const movements_count = ref<Pagination>({
    page: 1,
    total_count: 0,
    total_pages: 0
  })
  const transferList = ref({
    product_unit_markups: [],
    container_ids: [],
    part_ids: []
  })
  const markups = ref([])
  const notification = useNotification()

  const getAllMovements = async (params: MovementParams) => {
    const { data } = await api.get<Response>('/transfer/', { params })

    movements.value = data.data

    movements_count.value = data.pagination
  }

  const addMovement = async (movement: Movement) => {
    const { data } = await api.post<Movement>('movement/create', movement)
    console.log(data)

    router.push({ name: 'showmovement', params: { id: data._id } })
    // notification.setNotif(true, 'Добавлено', 'success')
  }

  const getMovement = async (id: string) => {
    return await api.get<Movement>(`movement/${id}`)
  }

  const getProductPacks = async (id: string) => {
    console.log(id)

    return await api.get<ResponseProductPack>(`movementpack/all`, {
      params: {
        movement: id
      }
    })
  }

  const saveMovement = async (proImovement: Movement) => {
    await api.put('movement/update', proImovement)
    notification.setNotif(true, 'Статус обновлено!', 'info')
    await router.push({ name: 'movements' })
  }

  const addComment = async (data: Comment) => {
    return await api.post<Comment>('comment/create', data)
  }

  const createTransfer = async (data: any) => {
    const response = await api.post('/transfer/', data)
    const { data: responseData } = response

    notification.setNotif(true, 'Добавлено!', 'success')
    await router.push({ name: 'showmovement', params: { id: responseData.id } })
    return responseData
  }

  const updatePhotoTransfer = async (data: any) => {
    await api.post(`/transfer/${data.id}/update_photos/`, data.data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    notification.setNotif(true, 'Добавлено', 'success')
  }

  const getMarkups = async (params: any) => {
    const { data } = await api.get(`/product/${params.product_id}/markups/from_warehouse/${params.warehouse_id}/`)

    markups.value = data
  }

  return {
    movements,
    movements_count,
    getProductPacks,
    getMovement,
    addComment,
    saveMovement,
    addMovement,
    getAllMovements,

    transferList,
    createTransfer,

    getMarkups,
    markups,
    updatePhotoTransfer
  }
})
