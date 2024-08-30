import type { User } from '../user'
import type { Warehouse } from '../warehouse'
import type { ProductPack } from './productpack'

export type Comment = {
  id?: string
  invoice_id?: string | number
  user?: User
  text: string
  createdAt?: Date
  productinvoice?: string
  invoice?: string
  params: {
    invoice_id: string | number
  }
}

export interface mainProInvoice {
  id?: string
  number: string
  status?: number
  file?: string
  updatedAt?: Date
  cretedAt?: Date
}

export interface Logger {
  _id: string
  invoice_id: string | number
  action: string
  createdAt: Date
  user: User
}

export interface getProInvoice extends mainProInvoice {
  warehouse: Warehouse
  employee?: User
  comments?: Comment[]
  loggers?: Logger[]
  product_lots?: []
}

export interface ProInvoice extends mainProInvoice {
  // invoice_id: string | number
  warehouse?: string
  employee?: string | number | null
  productpacks?: ProductPack[] | undefined
}
