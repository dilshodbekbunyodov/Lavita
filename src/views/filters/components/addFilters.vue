<template>
  <TransitionRoot as="template" :show="toggle">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                Добавление фильтра
              </DialogTitle>


              <div class="mt-4">
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Название отдела</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="name"
                    autocomplete="off"
                    v-model="data.name"
                    @keypress.enter="send"
                    placeholder="Введите название"
                    class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label for="name1" class="block text-sm font-medium leading-6 text-gray-900">Товар</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <select id="name1" v-model="data.product_id"
                          class="block w-full rounded-md border-0 py-2 mt-2 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6">
                    <option v-for="(item, index) in store2.productList" :key="index" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </div>

              <div class="mt-4">
                <label for="name3" class="block text-sm font-medium leading-6 text-gray-900">Дата получения</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    v-model="data.date_of_receive"
                    id="name3"
                    type="date"
                    class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                  >
                </div>
              </div>

              <div class="mt-6 flex flex-row">
                <button
                  type="button"
                  class="mt-3 flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="close"
                >
                  Отмена
                </button>
                <button
                  :disabled="!data.name && !data.product_id && !data.date_of_receive"
                  type="button"
                  class="inline-flex flex-1 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="send"
                >
                  Добавить
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

import { useFullStore } from '@/stores/usefull/modal'
import { filtersStore } from '@/stores/filters/filters'
const store = useFullStore()
const store2 = filtersStore()
const { toggle } = storeToRefs(store)

interface Data {
  name: string | null,
  product_id: null | string,
  date_of_receive: string | null
}

const data = ref<Data>({
  name: null,
  product_id: null,
  date_of_receive: null
})

const emit = defineEmits(['send'])
const send = () => {
  if (data.value.name && data.value.product_id && data.value.date_of_receive) {
    emit('send', { ...data.value })
    close()
    data.value = {
      name: null,
      product_id: null,
      date_of_receive: null
    }
  }
}

const close = () => {
  store.setToggle(false)
}
</script>
