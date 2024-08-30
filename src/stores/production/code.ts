import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

type Params = {
  
  skip?: number
  metacode?: string
  warehouse?: string
  productinvoice?: string
  productpack?: string
  invoice?: string
  product?: string
  isSales: boolean
  isUtil: boolean
  count: boolean
  status?: number
}

type responseCountProduct = {
  count: number
}

export const codeStore = defineStore('codeStore', () => {
  const getCountProduct = async (params: Params) => {
    const { data } = await api.get<responseCountProduct>('code/all', { params })
    return data
  }

  return {
    getCountProduct
  }
})
