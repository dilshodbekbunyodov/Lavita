export type Department = {
  _id?: string
  title: string
  employees?: User[]
  employee_count?: number
}

export interface User {
  name?: string
  phone?: string
  login: string
  password?: string
  lastname?: string
  username?: string
}

export interface setUser extends User {
  department?: string
}

export interface getUser extends User {
  id?: string
  status?: boolean
  department: Department
}

export interface Login  {
  username: string
  password: string
}
