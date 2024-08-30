import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

import { type Comment } from '@/types/production/proInvoice'
import type { Invoice, getInvoice, setInvoice } from '@/types/invoice/invoice'
import type { GetAll, Params } from '@/types/api'
import { useNotification } from '../usefull/notification'
import router from '../../router'
import type { getProductPack } from '@/types/production/productpack'
type Response = GetAll & {
  data: getInvoice[]
}

type ResponseProductPack = GetAll & {
  data: getProductPack[]
}

type InvoiceParams = Params & {
  warehouse?: string
}

export const invoiceStore = defineStore('invoiceStore', () => {
  const invoices = ref<getInvoice[]>([])
  const invoices_count = ref<number>(0)
  const invoices_page = ref<number>(1)
  const notification = useNotification()
  const userList = ref([])
  const commentsList = ref([])
  const logtsList = ref([])

  const getAllUser = async () => {
    const { data } = await api.get<Response>('user/')

    userList.value = data
  }

  const updateFileInvoice = async ({ id, files }: { id: number | string; files: File }) => {
    return await api.post(`/invoice/${id}/update_photos/`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const getAllInvoices = async (params: InvoiceParams) => {
    const { data } = await api.get<Response>('invoice/', { params })
    // console.log(data.data)
    invoices.value = [...data.data]

    invoices_count.value = data.pagination.totalCount
    invoices_page.value = data.pagination.pageCount
  }

  const addInvoice = async (invoice: setInvoice) => {
    return await api.post<setInvoice>('invoice/', invoice)
  }

  const getInvoice = async (transfer_id: any) => {
    return await api.get<getInvoice>(`/transfer/${transfer_id.transfer_id}/`)
  }

  const getProductPacks = async (id: string) => {
    return await api.get<ResponseProductPack>(`invoicepack/all`, {
      params: {
        invoice: id
      }
    })
  }

  const saveInvoice = async (proIinvoice: Invoice) => {
    await api.post(`/transfer/${proIinvoice.invoice_id}/publish/`, proIinvoice)
    notification.setNotif(true, 'Статус обновлено!', 'info')
    await router.push({ name: 'movements' })
  }

  const addComment = async (params) => {
    console.log(params.text, 'dsa')
    console.log(params, 'dsa')
    return await api.post<Comment>(`/invoice/${params.params.invoice_id}/add_comment/`, { text: params.text })
  }

  const getInComment = async (params) => {
    const { data } = await api.get<Response>(`/transfer/${params.invoice_id}/comments/`)

    commentsList.value = data
  }

  const getInLogs = async (params) => {
    const { data } = await api.get<Response>(`/transfer/${params.invoice_id}/logs/`)

    logtsList.value = data
  }

  return {
    getAllUser,
    userList,
    invoices,
    getProductPacks,
    getInvoice,
    invoices_count,
    addComment,
    invoices_page,
    saveInvoice,
    addInvoice,
    getAllInvoices,
    updateFileInvoice,
    getInComment,
    commentsList,
    getInLogs,
    logtsList
  }
})
