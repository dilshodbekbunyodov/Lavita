import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { type getWarehouse, type Warehouse } from '@/types/warehouse'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'
import router from '../../router'
import { array } from 'yup'

type Response = GetAll & {
  data: getWarehouse[]
}

type ParamsWarehouse = Params & {
  user_ids?: string
  name?: string
}


interface Pagination {
  page: number;
  total_count: number | null;
  total_pages: number | null;
}


export const warehouseStore = defineStore('warehouseStore', () => {
  const warehouses = ref<getWarehouse[]>([])
  const warehouseHistory = ref<[]>([])

  const warehousesPagination = ref<Pagination>({
    page: 1,
    total_count: 0,
    total_pages: 0
  })
  // const warehouses_page = ref<number>(1)
  const responsibleUser = ref<[]>([])
  const warehouseList = ref<[]>([])
  const productMarkups = ref([])
  const notification = useNotification()

  const getAllWarehouses = async (params: { limit: number }) => {
    const { data } = await api.get('/warehouse/', { params })

    warehouses.value = data.data
    warehousesPagination.value = data.pagination
  }

  const addWarehouse = async (warehouse: Warehouse) => {
    await api.post<Warehouse>('/warehouse/', warehouse)

    await router.push({ name: 'warehouses' })
    notification.setNotif(true, 'Добавлено', 'success')
  }

  const getResponsibleUser = async (params: any) => {
    const { data } = await api.get('/user/', {params})
    responsibleUser.value = data.data
  }

  const getWarehouse = async (id: string) => {
    return await api.get<getWarehouse>(`warehouse/${id}`)
  }

  const getWarehouseDetail = async (id: string) => {
    const { data } = await api.get<getWarehouse>(`warehouse/${id}`)
    warehouseList.value = data
  }

  const saveWarehouse = async (warehouse: any) => {
    await api.put(`/warehouse/${warehouse.warehouse_id}/`, warehouse.params)

    await router.push({ name: 'warehouses' })
    notification.setNotif(true, 'Успешно отредактировано', 'success')
  }

  const getWarehouseHistory = async (warehouse_id: string) => {
    const { data } = await api.get<getWarehouse>(`/warehouse/${warehouse_id.warehouse_id}/history/?limit=50`)
    warehouseHistory.value = data.data
  }

  const getProductMarkups = async (params: any) => {
    const { data } = await api.get<getWarehouse>(`/product/${params.product_id}/markups/from_warehouse/${params.warehouse_id }/`)
    console.log(data)
    productMarkups.value = data
  }

  return {
    warehouses,
    saveWarehouse,
    warehousesPagination,
    getWarehouse,
    addWarehouse,
    getAllWarehouses,
    getResponsibleUser,
    responsibleUser,

    getWarehouseDetail,
    warehouseList,

    getWarehouseHistory,
    warehouseHistory,

    productMarkups,
    getProductMarkups
  }
})
