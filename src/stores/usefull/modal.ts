import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFullStore = defineStore('useFullStore', () => {
  const toggle = ref<boolean>(false)
  const setToggle = (value: boolean) => {
    toggle.value = value
  }


  return {
    toggle,
    setToggle
  }
})
