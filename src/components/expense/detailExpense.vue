<template>
  <div class="max-w-md w-full">
    <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
      <div
        class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
      >
        <!-- {{ store2.warehouse }} -->
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
          <tr v-for="(product, inx5) in store2.warehouse[selected]" :key="inx5">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {{ product.name }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ product?.quantity }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <button
                type="button"
                @click="add(product, selected)"
                class="rounded-sm bg-blue-100 p-2 hover:bg-blue-600 hover:text-white text-blue-700"
              >
                <PlusIcon class="size-3" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { productUnitList } from '@/types/production/product'
import { productStore } from '@/stores/production/product'
import { storeToRefs } from 'pinia'
import type { ProductPack } from '@/types/production/productpack'
import type { Status } from '@/types/helper'
import { watchDebounced } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { expenseStore } from '@/stores/expense/expense'

const store2 = expenseStore()
const emit = defineEmits(['add'])
const props = defineProps(['count', 'warehouse'])

type Search = {
  title: string
  type: number
}

const store = productStore()
const { warehouseList } = storeToRefs(store)

const selected = ref<number>('products')
const search = ref<Search>({
  title: '',
  type: 2
})
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

const add = (product: ProductPack, selected: any) => {
  emit('add', { ...product }, selected)
}

const setCurrent = (value: number) => {
  if (value) {
    selected.value = value
    // getData()
  }
}

// const getData = async () => {
//   await store.getAllWarehouse({
//     warehouse_id: props.warehouse
//   })
// }

// watch(
//   () => props.warehouse,
//   (val) => {
//     if (val) {
//       getData()
//     }
//   }
// )

watchDebounced(
  () => search.value.title,
  async function (title) {
    if (title.length > 0) {
      return await store.getAllProducts({
        limit: 5,
        count: props.count || false,
        title,
        type: selected.value
      })
    }
    store.clearProducts()
  },
  { deep: true, debounce: 500, maxWait: 5000 }
)
</script>
