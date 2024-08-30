import type { ProductPack } from '../production/productpack'
import type { User } from '../user'
import type { Warehouse } from '../warehouse'

export type Movement = {
  _id?: string
  employee: string | User
  number: string
  from_warehouse: string | Warehouse
  to_warehouse: string | Warehouse
  codes: string[]
  file?: string[]
  movementpacks?: ProductPack[]
  status?: number
}
