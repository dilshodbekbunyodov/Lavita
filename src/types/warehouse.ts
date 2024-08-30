import type { User } from './user'

interface typeWarehouse {
  title: string
  address: string
}

export interface Warehouse extends typeWarehouse {
  warehouse_id: string
  users: string[]
}

export interface getWarehouse extends typeWarehouse {
  id?: string
  capacity: number,
  created_at: string,
  updated_at: string,
  name: string,
  product?: {
    count: number
    all_price: number
  }
  tara?: {
    count: number
    all_price: number
  }
  detail?: {
    count: number
    all_price: number
  }
  users?: User[]
  status?: number
}
