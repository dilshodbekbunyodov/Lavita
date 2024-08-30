<template>
  <div class="max-w-md w-full">
    <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
      <div
        class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
      >
        Все товары

        <nav class="flex space-x-1 bg-gray-200 p-0.5 rounded-md" aria-label="Tabs">
          <button
            type="button"
            v-for="tab in productStatusList.filter((product) => product.value !== 0)"
            :key="tab.title"
            @click="setCurrent(tab.value)"
            :class="[
              tab.value == selected
                ? 'bg-white text-gray-900'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            ]"
            :aria-current="tab.value == selected ? 'page' : undefined"
          >
            {{ tab.title }}
          </button>
        </nav>
      </div>
      <div class="p-4 border-b-[1px] border-gray-100">
        <la-search v-model="search.title" placeholder="Поиск" />
      </div>

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
            Ед. измериния
          </th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only"> </span>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(product, index) in productsList[selected]" :key="index">
          <td
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 flex gap-3 justify-start items-center"
          >
            <img
              v-if="product.photo"
              :src="`${product.photo ? url + '/' + product.photo : nophoto}`"
              class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-10 h-10 rounded-[144px] bg-[url(&#x27;text.png&#x27;)] bg-cover bg-no-repeat bg-center"
            />
            {{ product?.name }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {{ getUnitTitle(product?.measurement) }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <button
              type="button"
              @click="add(product)"
              class="rounded-sm bg-blue-100 p-2 hover:bg-blue-600 hover:text-white text-blue-700"
            >
              <PlusIcon class="size-3" />
            </button>
          </td>
        </tr>

        <tr v-if="[selected] && [selected].length === 0">
          <td colspan="3" class="text-center p-3">
            <span class="text-sm">Нет данных</span>
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { productUnitList } from '@/types/production/product'
import { productStore } from '@/stores/production/product'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { onMounted } from 'vue'
import type { ProductPack } from '@/types/production/productpack'
import nophoto from '@/assets/nophoto.png'
import type { Status } from '@/types/helper'

const url = import.meta.env.VITE_URL
const emit = defineEmits(['add', 'getInvoiceType'])
const store = productStore()
const { productsList } = storeToRefs(store)

type Search = {
  title: string
  type: number
}

const search = ref<Search>({
  title: '',
  type: 2
})
const timeOut = ref<number | null>(null)
const selected = ref<number>('products')
const productStatusList = ref<Status[]>([
  {
    title: 'Продукты',
    value: 'products',
    current: false

  },
  {
    title: 'Тары',
    value: 'containers',
    current: false

  },
  {
    title: 'Детали',
    value: 'parts',
    current: false
  }
])


watch(() => search.value.title, async (title) => {
  if (title.length > 0) {
    if (timeOut.value !== null) {
      clearTimeout(timeOut.value)
    }

    timeOut.value = setTimeout(async () => {
      await getPro(title)
    }, 500)
  } else {
    await getPro('')
  }
})

onMounted(async () => {
  await store.getAllProductsList()
})
const getPro = async (title: any) => {
  await store.getAllProductsList({
    name: title || null
  })
}

const getUnitTitle = (measurement: any) => {
  const unit = productUnitList.value.find(unit => unit.value === measurement)
  return unit ? unit.title : ''
}

const add = (product: ProductPack) => {
  emit('add', { ...product })
}

const setCurrent = (value: number) => {
  if (value) {
    selected.value = value

    emit('getInvoiceType', value)
  }
}
</script>

