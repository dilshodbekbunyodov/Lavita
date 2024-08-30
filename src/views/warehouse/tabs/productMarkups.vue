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
                Маркировка
              </DialogTitle>


              <div class="mt-4">
<!--                <pre>{{markArray}}</pre>-->
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                    >
                      Маркировка
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                    >
                      Дата
                    </th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="(item, index) in markArray"
                    :key="index"
                    class="hover:cursor-pointer"
                  >
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ item.id }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ item.created_at ? convertDate(item.created_at, 'full') : '' }}
                    </td>
                  </tr>

                  <tr v-if="markArray &&  markArray.length === 0">
                    <td colspan="4" class="text-center p-3">
                      <span class="text-sm">Нет данных</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-6 flex flex-row">
                <button
                  type="button"
                  class="mt-3 flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="close"
                >
                  Отмена
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'
import { useFullStore } from '@/stores/usefull/modal'
import { convertDate } from '@/helpers/func'
const store = useFullStore()

const { toggle } = storeToRefs(store)
defineProps({
  markArray: {
    type: Array,
    default: () => []
  }
})

const close = () => {
  store.setToggle(false)
}
</script>

<style scoped>

</style>
