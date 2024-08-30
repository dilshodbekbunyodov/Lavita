import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import type { ProInvoice, getProInvoice, Comment } from '../../types/production/proInvoice'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'
import router from '../../router'
import type { getProductPack } from '@/types/production/productpack'

type Response = GetAll & {
  data: getProInvoice[]
}

type ResponseProductPack = GetAll & {
  data: getProductPack[]
}

type ProInvoiceParams = Params & {
  warehouse?: string
}

type ProHistory = {
  warehouse_id: number
}

interface Pagination {
  page: number;
  total_count: number | null;
  total_pages: number | null;
}

export const proInvoiceStore = defineStore('proInvoiceStore', () => {
  const proInvoices = ref<getProInvoice[]>([])
  const warehouseHistory = ref<[]>([])
  const warehouseHistoryPagination = ref<Pagination>({
    page: 1,
    total_count: 0,
    total_pages: 0
  })
  const proInvoicesPaginate = ref<Pagination>({
    page: 1,
    total_count: 0,
    total_pages: 0
  })
  const invoicePro = ref([])

  const commentList = ref([])
  const logs = ref([])
  const filterList = ref([])

  const notification = useNotification()

  const getAllHistory = async (params: ProHistory) => {
    const { data } = await api.get(`/warehouse/${params.warehouse_id}/history/`, { params })

    warehouseHistory.value = data.data

    warehouseHistoryPagination.value = data.pagination
  }

  const getAllProInvoices = async (params: ProInvoiceParams) => {
    const { data } = await api.get<Response>('/production/', { params })

    proInvoices.value = data.data
    proInvoicesPaginate.value = data.pagination
  }

  const addProInvoice = async (proInvoice: ProInvoice) => {
    const { data } = await api.post<ProInvoice>('/production/', proInvoice)

    notification.setNotif(true, 'Добавлено', 'success')
    await router.push({ name: 'showproinvoice', params: { id: data?.id } })
  }

  const getProInvoice = async (params: any) => {
    console.log(params, 'rr')
    return await api.get<getProInvoice>(`production/${params.production_id}/`)
  }

  const getProductPacks = async (id: string) => {
    return await api.get<ResponseProductPack>(`productpack/all`, {
      params: {
        productinvoice: id
      }
    })
  }

  const saveProInvoice = async (proIinvoice: ProInvoice) => {
    await api.post(`production/${proIinvoice.invoice_id}/publish/`)
    notification.setNotif(true, 'Статус обновлено!', 'info')
    router.push({ name: 'proinvoice' })
  }

  const addComment = async (data: Comment) => {
    return await api.post<Comment>(`/production/${data.params.invoice_id}/add_comment/`, { text: data.text })
  }

  const getComment = async (params: any) => {
    const { data } = await api.get(`/production/${params.invoice_id }/comments/`, {params})

    commentList.value = data
  }

  const getLogs = async (params: any) => {
    const { data } = await api.get(`/production/${params.invoice_id }/logs/`, {params})

    logs.value = data
  }

  const getFilterList = async (params: any) => {
    const { data } = await api.get(`/filter/`, {params})

    filterList.value.push(data.data)
    return data
  }

  const getInvoicePro = async (params: any) => {
    const { data } = await api.get(`/filter/${params.filter_id}/`)

    invoicePro.value = data.markups
  }

  return {
    proInvoices,
    getProductPacks,
    getProInvoice,
    addComment,
    saveProInvoice,
    addProInvoice,
    getAllProInvoices,

    getAllHistory,
    warehouseHistory,
    warehouseHistoryPagination,
    proInvoicesPaginate,

    getComment,
    commentList,
    getLogs,
    logs,

    filterList,
    getFilterList,
    getInvoicePro,
    invoicePro
  }
})
