import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/helpers/api'

interface Pagination {
  page: number;
  total_count: number | null;
  total_pages: number | null;
}

export const filtersStore = defineStore('filtersStore', () => {
  const filterList = ref([])
  const productList = ref([])
  const filterListDetail = ref({
    created_at: '',
    date_of_receive: '',
    is_active: null,
    markups: [],
    name: '',
    product_id: 0,
    updated_at: '',
    product_name: '',
  })
  const filterListPagination = ref<Pagination>({
    page: 1,
    total_count: 0,
    total_pages: 0
  })

  const getAllProducts = async (params: any) => {
    const { data } = await api.get('/product/', { params })

    productList.value = data.data
  }

  const getAllFilters = async (params: any) => {
    const { data } = await api.get('/filter/', { params })

    filterList.value = data.data
    filterListPagination.value = data.pagination
  }

  const createFilter = (data: any) => {
    return api.post('/filter/', data)
  }

  const getAllFiltersDetail = async (params: any) => {
    const { data } = await api.get(`/filter/${params.filter_id}/`, { params })

    filterListDetail.value = data
  }

  const deleteFilter = (params: any) => {
    return api.delete(`/filter/${params.filter_id}/`)
  }

  const updateFilter = (params: any) => {
    return api.put(`/filter/${params.filter_id.id }/`, params.data)
  }


  const createMarkups = (data: any) => {
    return api.post(`/filter/${data.filter_id}/add-markups/`, data.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }


  return {
    getAllProducts,
    productList,
    filterList,
    filterListPagination,
    getAllFilters,
    createFilter,
    getAllFiltersDetail,
    filterListDetail,
    deleteFilter,
    updateFilter,
    createMarkups
  }
})
