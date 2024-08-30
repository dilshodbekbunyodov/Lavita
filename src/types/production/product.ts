import { ref } from 'vue'
import type { Status, Unit } from '@/types/helper'

export const productStatusList2 = ref<Status[]>([
  {
    title: 'Все товары',
    value: 0,
    current: true
  },
  {
    title: 'Тары',
    value: 1,
    current: false,
    class: 'bg-yellow-100 text-yellow-800'
  },
  {
    title: 'Продукты',
    value: 2,
    current: false,
    class: 'bg-blue-100 text-blue-800'
  },
  {
    title: 'Детали',
    value: 3,
    current: false,
    class: 'bg-gray-100 text-gray-800'
  }
])

export const productStatusList = ref<Status[]>([
  {
    title: 'Все товары',
    value: 0,
    current: true
  },
  {
    title: 'Тары',
    value: 'containers',
    current: false,
    class: 'bg-yellow-100 text-yellow-800'
  },
  {
    title: 'Продукты',
    value: 'products',
    current: false,
    class: 'bg-blue-100 text-blue-800'
  },
  {
    title: 'Детали',
    value: 'parts',
    current: false,
    class: 'bg-gray-100 text-gray-800'
  }
])

export const productUnitList = ref<Unit[]>([
  {
    title: 'шт',
    value: 'q'
  },
  {
    title: 'кг',
    value: 'kg'
  },
  {
    title: 'литр',
    value: 'l'
  }
])

export type Detail = {
  id?: string
  detail?: string
  name: string
  unit: number
  maxcount?: number
  count: number
}

export interface Product {
  _id?: string
  title: string
  description?: string
  details?: Detail[]
  products?: Product[]

  status?: number
  type?: 1 | 2 | 3
  unit: 1 | 2 | 3
  photo?: string
  count?: number
  summa?: number
}
