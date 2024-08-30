export type GetAll = {
  pagination: {
    totalCount: number
    pageSize: number
    pageCount: number
    page: number
  }
}

export type Params = {
  search?: object
  status?: number | null
  type?: number
  page?: number
  limit: number
  select?: string[]
  sort?: {
    _id?: number
  }
}

export type toRouteType = {
  name: string
  params: {
    id: number | string
  }
}
