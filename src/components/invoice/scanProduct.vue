<template>
  <div>
    <TransitionRoot as="template" :show="toggle">
      <Dialog as="div" class="relative z-10">
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
            class="flex min-h-full h-dvh items-end justify-center text-center sm:items-end sm:p-0"
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
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full max-h-[80%] flex flex-col"
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
                <DialogTitle
                  as="h3"
                  class="text-lg font-semibold px-4 py-3.5 leading-6 text-gray-900 flex items-center justify-between w-full pr-16 border-b-[1px] border-gray-200"
                >
                  <div>
                    {{ model?.title || '' }}
                    <div class="font-normal">
                      Внесено маркировок {{ scannedBarcodes.filter(item => item !== '').length }} из
                      {{ model?.codes?.length }}
                    </div>
                  </div>
                  <input
                    ref="barcodeInput"
                    @keydown="onInput"
                    v-model="barcode"
                    @blur="checkFocus"
                    type="text"
                    class="opacity-0"
                    placeholder="Scan barcode here"
                  />
                  <button
                    v-if="route.path == '/proinvoice/create'"
                    :class="`px-[17px] py-[9px] ${codeToggle ? 'text-blue-700 bg-blue-100' : 'bg-blue-600  text-white'} rounded-[4px] text-sm flex   gap-2 items-center font-medium
                    `"
                    @click="toggleScan"
                  >
                    <img v-if="codeToggle" src="@/assets/icons/pause.svg?url" alt="" />
                    <img v-else src="@/assets/icons/qrcode-white.svg?url" alt="" />
                    {{ codeToggle ? 'Остановить сканирование' : 'Запустить сканирование' }}
                  </button>
                </DialogTitle>
                <div ref="scannerContainer" class="scanner-container hidden"></div>
                <div
                  class="mt-4 grid grid-cols-4 gap-4 flex-wrap w-full flex-1 overflow-auto px-4 py-3.5"
                >
                  <div
                    class="flex-row shadow-sm flex justify-start relative rounded-lg bg-gray-50 border-[1px] border-gray-300"
                    v-for="(item, index) of model?.codes"
                    :key="item"
                  >
                    <div class="text-sm text-center px-[13px] py-[9px] text-gray-500">
                      {{ index + 1 }}
                    </div>
                    <input v-model="scannedBarcodes[index]" type="text"
                           class="block w-full rounded-r border-0 py-1.5 px-2.5 bg-white text-gray-900
                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                    >
                  </div>
                </div>

                <div class="flex flex-row px-6 py-4 border-t-[1px] border-gray-200">
                  <button
                    type="button"
                    class="mt-3 flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="clear"
                  >
                    Отмена
                  </button>
                  <button
                    type="button"
                    class="inline-flex flex-1 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                    @click="send"
                  >
                    Сохранить
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup lang="ts">
import type { ProductPack } from '@/types/production/productpack'
import { useFullStore } from '@/stores/usefull/modal'
import { storeToRefs } from 'pinia'

const usefullStore = useFullStore()
const { toggle } = storeToRefs(usefullStore)
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useNotification } from '@/stores/usefull/notification'
import { useRoute } from 'vue-router'
import { proInvoiceStore } from '@/stores/invoice/proInvoice'

const notification = useNotification()
const route = useRoute()

const store = proInvoiceStore()
const codeToggle = ref<Boolean>(false)
const barcode = ref<string>('')
const scannedBarcodes = ref<string[]>([])

const barcodeInput = ref<HTMLInputElement | null>(null)
const onInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const value: string = barcode.value.trim()
    // if (scannedBarcodes.value.includes(value)) {
    //   notification.setNotif(true, 'Товар с таким маркировкой уже имеется', 'warning')
    //   barcode.value = ''
    //   return false
    // }

    console.log(value)

    if (value) {

      console.log(value, 'value')

      if (store.invoicePro && store.invoicePro.length) {
        let item = store.invoicePro.find((e) => {
          return e.id == value
        })


        if (item && Object.keys(item).length) {

          if (!item.is_used) {

            if (scannedBarcodes.value.includes(value)) {
              notification.setNotif(true, 'Товар с таким маркировкой уже имеется', 'warning')
              barcode.value = ''
              return false
            } else {
              scannedBarcodes.value.push(value)
              barcode.value = ''
            }
          } else {
            notification.setNotif(true, 'Товар с таким маркировкой уже имеется', 'warning')
          }
        } else {
          notification.setNotif(true, 'Этого значка не существует', 'warning')
          barcode.value = ''
        }
      } else {
        if (scannedBarcodes.value.includes(value)) {

          notification.setNotif(true, 'Товар с таким маркировкой уже имеется', 'warning')
          barcode.value = ''
          return false
        } else {
          console.log('else push value')
          scannedBarcodes.value.push(value)
          barcode.value = ''
        }
      }

    }
    // if (!codeToggle.value) {
    //   barcode.value = ''
    //   return value
    // }
    event.preventDefault()
  }
}

const checkFocus = () => {
  if (codeToggle.value) {
    barcodeInput.value?.focus()
  }
}

const toggleScan = () => {
  codeToggle.value = !codeToggle.value
  if (codeToggle.value) {

    barcodeInput.value?.focus()
  } else {
    barcode.value = ''
  }
}

const clear = () => {
  close()
}

const emit = defineEmits(['update'])
const send = () => {
  emit('update', [...scannedBarcodes.value])
  scannedBarcodes.value = []
  close()
}

const close = () => {
  codeToggle.value = false
  usefullStore.setToggle(false)
}

const model = defineModel<ProductPack>()
</script>
