<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { productStatusList2, productUnitList } from '@/types/production/product'
import { type Detail } from '@/types/production/product'
const url = import.meta.env.VITE_URL
const selected = ref<number>(3)

const props = defineProps({
  type: {
    type: Number || null
  }
})
const emit = defineEmits(['add'])
const add = (product: Detail) => {
  emit('add', { ...product, type: selected.value == 3 ? 'part' : 'container' })
}

const setCurrent = (value: number) => {
  selected.value = value
}

import { productStore } from '@/stores/production/product'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'
const store = productStore()
const { products } = storeToRefs(store)

type Search = {
  title: string
  type: number
}

const search = ref<Search>({
  title: '',
  type: selected.value
})

watch(
  () => selected.value,
  async (value) => {
    if (selected.value == 3) {
      await store.getParts({ limit: 500 })
    } else {
      await store.getAllContainers({ limit: 500 })
    }
  }
)

watchDebounced(
  () => search.value.title,
  async function () {
    if (search.value.title) {
      if (selected.value == 3) {
        await store.getParts({ limit: 500, name: search.value.title })
      } else {
        await store.getAllContainers({ limit: 500, name: search.value.title })
      }
    } else {
      if (selected.value == 3) {
        await store.getParts({ limit: 500 })
      } else {
        await store.getAllContainers({ limit: 500 })
      }
    }
  },
  { deep: true, debounce: 500, maxWait: 5000 }
)

onMounted(async () => {
  try {
    if (selected.value == 3) {
      await store.getParts({ limit: 500 })
    } else {
      await store.getAllContainers({ limit: 500 })
    }
  } catch (err) {}

  store.clearProducts()
})
</script>

<template lang="">
  <div class="max-w-md w-full">
    <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      <div
        class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
      >
        Детали товара
        <!-- {{ selected }} -->
        {{ props.type }}
        <nav class="flex space-x-1 bg-gray-200 p-0.5 rounded-md" aria-label="Tabs">
          <button
            type="button"
            v-for="tab in productStatusList2.filter((product) =>
              [props.type == 1 ? 3 : 1, 3].includes(product.value)
            )"
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
          <tr v-for="part in store.parts" :key="part.id" v-if="selected == 3">
            <td
              class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 flex gap-3 justify-start items-center"
            >
              <img
                v-if="part.photo"
                :src="`${url}/${part.photo}`"
                class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-10 h-10 rounded-[144px] bg-[url(&#x27;text.png&#x27;)] bg-cover bg-no-repeat bg-center"
              />
              {{ part.name }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ part.measurement == 'q' ? 'шт' : part.measurement == 'l' ? 'литр' : 'кг' }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <button
                type="button"
                @click="add(part)"
                class="rounded-sm bg-blue-100 p-2 hover:bg-blue-600 hover:text-white text-blue-700"
              >
                <PlusIcon class="size-3" />
              </button>
            </td>
          </tr>

          <tr v-for="container in store.containers" :key="container.id" v-else>
            <td
              class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 flex gap-3 justify-start items-center"
            >
              <img
                v-if="container.photo"
                :src="`${url}/${container.photo}`"
                class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-10 h-10 rounded-[144px] bg-[url(&#x27;text.png&#x27;)] bg-cover bg-no-repeat bg-center"
              />
              {{ container.name }}  
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {{ container.measurement == 'q' ? 'шт' : container.measurement == 'l' ? 'литр' : 'кг' }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <button
                type="button"
                @click="add(container)"
                class="rounded-sm bg-blue-100 p-2 hover:bg-blue-600 hover:text-white text-blue-700"
              >
                <PlusIcon class="size-3" />
              </button>
            </td>
          </tr>

          <tr v-if="selected == 3 && store.parts && store.parts.length === 0">
            <td colspan="5" class="text-center p-3">
              <span class="text-sm">Нет данных</span>
            </td>
          </tr>

          <tr v-if="selected == 1 && store.containers && store.containers.length === 0">
            <td colspan="5" class="text-center p-3">
              <span class="text-sm">Нет данных</span>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<style lang=""></style>
