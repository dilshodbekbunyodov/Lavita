<template>
  <div class="flex flex-col justify-start items-start flex-grow gap-4">
    <div
      class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-sm"
    >
      <div
        class="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 relative px-4 py-3.5 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
      >
        <p class="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-gray-900">
          Накладная
        </p>
        <div
          class="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[87px] h-6 gap-1"
        ></div>
        <!-- {{ model }} -->
      </div>
      <div
        v-if="model?.length || false"
        class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0"
      >
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
              >
                название
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
              >
                Количество
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
              >
                Цена
              </th>
              <!-- <th
                scope="col"
                class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
              >
                Сумма
              </th> -->
              <th scope="col" class="relative py-3.5 max-w-14"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(product, index) of model" :key="index">
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                <div class="flex justify-start items-center flex-grow gap-3">
                  <div class="flex flex-col justify-start items-start flex-grow relative">
                    <p
                      class="self-stretch flex-grow-0 flex-shrink-0 w-[177.5px] text-sm font-medium text-left text-gray-900"
                    >
                      {{ product.title }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div
                  class="flex w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                >
                  <input
                    v-maska="'########'"
                    autocomplete="off"
                    @input="calc(index)"
                    v-model="product.count"
                    class="block w-full border-0 bg-none ring-0 placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div
                  class="flex w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                >
                  <input
                    v-maska="'###############'"
                    autocomplete="off"
                    v-model="product.price"
                    class="block w-full border-0 bg-none ring-0 placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6"
                  />
                  <span class="text-gray-500 text-sm"> сум </span>
                </div>
              </td>
              <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div
                  class="flex w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                >
                  <input
                    v-maska="'###############'"
                    autocomplete="off"
                    :disabled="true"
                    v-model="product.totalprice"
                    class="block w-full border-0 bg-none ring-0 placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6 disabled:bg-white"
                  />
                  <span class="text-gray-500 text-sm"> сум </span>
                </div>
              </td> -->

              <td class="relative whitespace-nowrap py-4 px-4 text-sm font-medium">
                <button @click="confirmRemove(index)" class="text-indigo-600 hover:text-indigo-900">
                  <XMarkIcon class="size-6 text-gray-400" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex p-4 border-t-2 border-gray-200 gap-2 w-full">
          <button
            type="submit"
            @click="save(2)"
            :disabled="model.length == 0"
            class="rounded-md flex-1 bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Сохранить как черновик
          </button>
          <button
            type="submit"
            @click="save(1)"
            :disabled="model.length == 0"
            class="rounded-md flex-1 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Сохранить и опубликовать
          </button>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4 p-4"
      >
        <div
          class="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3 p-4 rounded-md bg-blue-50"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10ZM11 6C11 6.26522 10.8946 6.51957 10.7071 6.70711C10.5196 6.89464 10.2652 7 10 7C9.73478 7 9.48043 6.89464 9.29289 6.70711C9.10536 6.51957 9 6.26522 9 6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6ZM9 9C8.73478 9 8.48043 9.10536 8.29289 9.29289C8.10536 9.48043 8 9.73478 8 10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11V14C9 14.2652 9.10536 14.5196 9.29289 14.7071C9.48043 14.8946 9.73478 15 10 15H11C11.2652 15 11.5196 14.8946 11.7071 14.7071C11.8946 14.5196 12 14.2652 12 14C12 13.7348 11.8946 13.4804 11.7071 13.2929C11.5196 13.1054 11.2652 13 11 13V10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9H9Z"
              fill="#60A5FA"
            ></path>
          </svg>
          <div class="flex flex-col justify-start items-start flex-grow gap-2.5">
            <div
              class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2"
            >
              <div
                class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative"
              >
                <p class="flex-grow w-[542px] text-sm font-medium text-left text-blue-800">
                  Выберите детали слева
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <dialogModal
    btnTitle="Убрать товар"
    title="Вы точно хотите удалить продукт из накладной?"
    :dialog="toggle"
    @answer="remove"
  />
</template>
<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { ref } from 'vue'
import { type Detail, productUnitList } from '@/types/production/product'
import { ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import type { ProductPack } from '@/types/production/productpack'
const model = defineModel<ProductPack[]>()

console.log(model, 'model')

const product = ref<ProductPack>({
  count: 0,
  product: '',
  productinvoice: '',
  title: '',
  codes: []
})
const indexProduct = ref<number>(0)
import { useNotification } from '@/stores/usefull/notification'
const notification = useNotification()

const handleUpdate = () => {
  if (model.value) {
    model.value[indexProduct.value] = product.value
    console.log(model.value)
  }
}

const calc = (index: number) => {
  if (!model.value) return false
  if (model.value[index].count > 0 && model.value[index].price) {
    model.value[index].totalprice =
      model.value[index].count * +model.value[index].price.toString().split(' ').join('')
  }
}

import dialogModal from '../default/dialogModal.vue'
const id = ref<number>(0)
const toggle = ref<boolean>(false)
const confirmRemove = (_id: number) => {
  id.value = _id
  toggle.value = true
}
const remove = (answer: boolean) => {
  if (answer) {
    model.value?.splice(id.value, 1)
  }
  close()
}
const close = () => {
  toggle.value = false
  id.value = 0
}

const emit = defineEmits(['save'])
const save = (status: number) => {
  let check = model.value?.every((product) => product.count > 0 && product.price)

  if (!check) {
    notification.setNotif(true, 'Заполните данные о накладного', 'warning')
  } else {
    emit('save', status)
  }
}
</script>
<style lang=""></style>
