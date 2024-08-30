import type { Product } from './product'

export interface ProductPack {
  _id?: string
  productinvoice?: string
  product: string
  count: number
  price?: number
  totalprice?: number
  title?: string
  maxcount?: number
  maxlimit?: boolean
  codes?: string[]
}

export interface getProductPack {
  _id: string
  productinvoice?: string
  product: Product
  count: number
  price?: number
  totalprice?: number
  title?: string
  codes?: string[]
  maxcount?: number
  updateAt?: Date
  productDetails?: Product
  cretedAt?: Date
}
