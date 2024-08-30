import type { ProductPack } from '../production/productpack'
import type { Comment, Logger } from '../production/proinvoice'
import type { User } from '../user'
import type { Warehouse } from '../warehouse'

export interface Invoice {
  _id?: string
  number: string
  status?: number
  file?: string[]
  updatedAt?: Date
  createdAt?: Date
}

export interface setInvoice extends Invoice {
  warehouse: string
  employee: string
  invoicepacks?: ProductPack[] | undefined
}

export interface getInvoice extends Invoice {
  warehouse?: Warehouse
  employee?: User
  comments?: Comment[]
  loggers?: Logger[]
}

export interface Invoicepack {
  invoice?: string
}
