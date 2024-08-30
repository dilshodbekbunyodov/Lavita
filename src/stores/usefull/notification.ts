import { ref } from 'vue'
import { defineStore } from 'pinia'

type Notif = {
  show: boolean
  msg: string
  type?: 'success' | 'warning' | 'danger' | 'info'
}

export const useNotification = defineStore('useNotification', () => {
  const notif = ref<Notif>({
    show: false,
    msg: '',
    type: 'success'
  })

  const setNotif = (
    show: boolean,
    msg: string,
    type: 'success' | 'warning' | 'danger' | 'info',
    time: number = 4000
  ) => {
    notif.value = {
      show,
      msg,
      type
    }

    setTimeout(() => {
      notif.value = {
        show: false,
        msg: ''
      }
    }, time)
  }

  return {
    notif,
    setNotif
  }
})
