import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { type Product } from '@/types/production/product'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'
import router from '../../router'

type Response = GetAll & {
  data: Product[]
}

type ProductParams = Params & {
  title?: string
  count?: boolean
  type?: string | number | null
}

interface Pagination {
  page: number;
  total_count: number | null;
  total_pages: number | null;
}


export const productStore = defineStore('productStore', () => {
  const warehouseStats = ref({})
  const invoiceStats = ref([])
  const allProduct = ref([])
  const universalStateForProduct = ref([])
  const universalStateForProductPagination = ref({})
  const containers = ref([])
  const paginationContainers = ref<object>({})
  const products = ref<Product[]>([])
  const pagination = ref<object>({})
  const parts = ref([])
  const paginationParts = ref({})
  const notification = useNotification()
  const productsList = ref([])
  const warehouseList = ref({})
  const productsListPagenation = ref<Pagination>({
    page: 1,
    total_count: 0,
    total_pages: 0
  })

  const getAllContainers = async (params) => {
    const { data } = await api.get<Response>('/container/', { params })

    containers.value = data.data ? data.data : []

    paginationContainers.value = data.pagination

    universalStateForProduct.value = data.data
    universalStateForProductPagination.value = data.pagination
  }

  const getAllProducts2 = async (params: ProductParams) => {
    const { data } = await api.get<Response>('/product/stats/', { params })
    universalStateForProduct.value = [...data.containers, ...data.parts, ...data.products]
    universalStateForProductPagination.value = {}
    console.log(data)
  }

  const getAllProducts = async (params: ProductParams) => {
    products.value = []
    const { data } = await api.get<Response>('/product/', { params })

    products.value = data

    pagination.value = data.pagination

    universalStateForProduct.value = data.data
    universalStateForProductPagination.value = data.pagination
  }

  const clearProducts = () => {
    products.value = []
  }

  const addProduct = async (product: Product) => {
    const res = await api.post<Product>('product/', product)
    notification.setNotif(true, 'Добавлено', 'success')

    return res
  }

  const updatePhotoContainer = async ({ id, data }: { id: number; data: object }) => {
    await api.post(`container/${id}/update_photo/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    notification.setNotif(true, 'Добавлено', 'success')
  }

  const updatePhotoPart = async (data) => {
    console.log(data)

    await api.post(`part/${data.id}/update_photo/`, data.data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    notification.setNotif(true, 'Добавлено', 'success')
  }

  const updatePhotoProduct = async ({ id, data }: { id: number; data: object }) => {
    await api.post(`product/${id}/update_photo/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    notification.setNotif(true, 'Добавлено', 'success')
  }

  const createPart = async (part) => {
    const res = await api.post('part/', part)
    notification.setNotif(true, 'Добавлено', 'success')

    console.log(res, 'store')

    return res
  }

  const createContainer = async (container) => {
    const res = await api.post('container/', container)
    notification.setNotif(true, 'Добавлено', 'success')

    return res
  }

  const getParts = async (params) => {
    const { data } = await api.get(`part/`, { params })

    parts.value = data.data ? data.data : []
    paginationParts.value = data.pagination ? data.pagination : {}

    universalStateForProduct.value = data.data
    universalStateForProductPagination.value = data.pagination
  }

  const getProduct = async (id: string) => {
    return api.get<Product>(`product/${id}`)
  }

  const getAllProductsList = async (params: any) => {
    const { data } = await api.get('/product/stats/', { params })

    productsList.value = data
    productsListPagenation.value = data.pagination
  }

  const getAllWarehouse = async (params: any) => {
    const { data } = await api.get(`/warehouse/${params.warehouse_id}/`, { params })

    warehouseList.value = data
  }

  const getWarehouseStats = async (id: string) => {
    const { data } = await api.get<Product>(`product/${id}/warehouse-stats/`)

    warehouseStats.value = data
  }

  const getInvoiceStats = async ({ id, params }) => {
    const { data } = await api.get<Product>(`product/${id}/invoice-stats/`, params)

    invoiceStats.value = data
  }

  return {
    invoiceStats,
    warehouseStats,
    containers,
    paginationContainers,
    parts,
    paginationParts,
    products,
    pagination,
    universalStateForProduct,
    universalStateForProductPagination,
    getAllProducts2,
    getWarehouseStats,
    getInvoiceStats,
    addProduct,
    getProduct,
    clearProducts,
    getAllProducts,
    getParts,
    getAllContainers,
    createPart,
    createContainer,
    updatePhotoContainer,
    updatePhotoPart,
    updatePhotoProduct,

    getAllProductsList,
    productsList,
    productsListPagenation,

    getAllWarehouse,
    warehouseList
  }
})
