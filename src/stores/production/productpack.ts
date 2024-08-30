import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'
import type { GetAll, Params } from '@/types/api'
import { type getProductPack } from '@/types/production/productpack'

type ResponseProductPack = GetAll & {
  data: getProductPack[]
}

type productPackParams = Params & {
  warehouse?: string
  productinvoice?: string
}

export const productPackStore = defineStore('productPackStore', () => {
  const productPacks = ref<getProductPack[]>()
  const productPacks_count = ref<number>(0)
  const productPacks_page = ref<number>(1)
  const allProductPacks = async (params: productPackParams) => {
    const { data } = await api.get<ResponseProductPack>('productpack/all', { params })

    productPacks.value = [...data.data]
    console.log(data.data)

    productPacks_count.value = data.pagination.totalCount
    productPacks_page.value = data.pagination.pageCount
  }



  return {
    allProductPacks,
	productPacks,
	productPacks_count,
	productPacks_page
  }
})
