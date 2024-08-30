import { ref } from "vue"

export type Status = {
  title: string
  value: number | string
  current?: boolean
  class?:string
  route?: {
    name: string,
    params?: string,
    query?: {}
  }
}


export type Unit = {
  title: string
  value: number
}

export const historyList = ref<Status[]>([
  {
    title: 'Вся история',
    value: 0,
    current: true,
    route: {
      name: 'warehouse_history'
    }
  },
  {
    title: 'Накладные',
    value: 1,
    current: false,
    route: {
      name: 'warehouse_history',
      query: { status: '1' }
    }
  },
  {
    title: 'Списания',
    value: 2,
    current: false,
    route: {
      name: 'warehouse_history',
      query: { status: '2' }
    }
  },
  {
    title: 'Премещение',
    value: 3,
    current: false,
    route: {
      name: 'warehouse_history',
      query: { status: '3' }
    }
  }
])


export const proinvoiceStatusList = [
  {
    title: 'Опубликовано',
    value: "published",
    class: 'bg-green-100 text-green-800'
  },
  {
    title: 'Черновик',
    value: "draft",
    class: 'bg-gray-100 text-gray-800'
  },
  {
    title: 'Отменён',
    value: "canceled",
    class: 'bg-red-100 text-red-800'
  }
]

export const productStatusList = ref<Status[]>([
    {
        title: 'Продукты',
        value: 2,
        current: false,

    },
    {
        title: 'Тары',
        value: 1,
        current: false,

    },
    {
        title: 'Детали',
        value: 3,
        current: false,

    }
])
