<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100">
          Содержимое склада
          <nav class="flex space-x-1 bg-gray-200 p-0.5 rounded-md" aria-label="Tabs">
            <button
              type="button"
              v-for="tab in productStatusList.filter((product) => product.value != 0)"
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
              остаток
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
            >
              Последнее обновление
            </th>
            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6" v-if="selected === 'products'">
              <span class="sr-only"> </span>
            </th>
          </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="pack in warehouse?.[selected]"
            :key="pack.id"
            class="font-medium text-gray-900 text-sm"
          >
            <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
              {{ pack.name }}
            </td>
            <td class="whitespace-nowrap px-3 py-4">{{ pack.count }} шт.</td>
            <td class="whitespace-nowrap px-3 py-4">
              {{ pack.updated_at ? convertDate(pack.updated_at, null) : '' }}
            </td>
            <td class="whitespace-nowrap px-3 text-right py-4" v-if="selected === 'products'">
              <button
                @click="openMarkups(pack)"
                type="button"
                class="rounded-sm bg-blue-100 p-2 hover:bg-blue-300 hover:text-white text-blue-600"
              >
                <img src="@/assets/icons/qrcode.svg?url" alt="" />
              </button>
            </td>
          </tr>

          <tr v-if="warehouse && warehouse[selected]?.length === 0">
            <td colspan="5" class="text-center p-4">
              <span class="text-sm">Нет данных</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div class="w-[420px] flex flex-col gap-3">
      <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100">
          Информация
        </div>
        <div class="p-4 border-b-[1px] border-gray-100">
          <div class="grid grid-cols-1 gap-2">
            <div class="flex flex-col">
              <div class="text-xs text-gray-500">Ответственный</div>
              <div class="text-sm font-medium">
              <span v-for="(item, index) in warehouse?.users" :key="index" class="block">
                {{ item.username }}
              </span>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-xs text-gray-500">Адрес</div>
              <div class="text-sm font-medium">{{ warehouse?.address }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 mb-2 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div class="text-sm font-medium mb-2">Все предметы</div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">Количество</div>
            <div class="text-xl font-bold">
              {{ warehouse?.capacity }} шт.
            </div>
          </div>
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">сумма</div>
            <div class="text-xl font-bold" v-if="warehouse?.total_price">{{ warehouse?.total_price.toLocaleString() }} cум</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 mb-2 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div class="text-sm font-medium mb-2">Товары</div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">Количество</div>
            <div class="text-xl font-bold">{{ warehouse?.product_total_quantity || 0 }} шт.</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">сумма</div>
            <div class="text-xl font-bold" v-if="warehouse?.product_total_price">{{ warehouse?.product_total_price.toLocaleString() || 0 }} cум</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 mb-2 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div class="text-sm font-medium mb-2">Тары</div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">Количество</div>
            <div class="text-xl font-bold">{{ warehouse?.container_total_quantity || 0 }} шт.</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">сумма</div>
            <div class="text-xl font-bold" v-if="warehouse?.container_total_price">{{ warehouse?.container_total_price.toLocaleString() || 0 }} cум</div>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 mb-2 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div class="text-sm font-medium mb-2">Детали</div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">Количество</div>
            <div class="text-xl font-bold">{{ warehouse?.part_total_quantity || 0 }} шт.</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 uppercase">сумма</div>
            <div class="text-xl font-bold">{{ warehouse?.part_total_price }} cум</div>
          </div>
        </div>
      </div>
    </div>

    <product-markups :markArray="warehouse_store.productMarkups"/>
  </div>
</template>

<script setup lang="ts">
import { convertDate } from '@/helpers/func'
import { productStatusList } from '@/types/production/product'
import type { getWarehouse } from '@/types/warehouse'
import { ref } from 'vue'
import { inject } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductMarkups from '@/views/warehouse/tabs/productMarkups.vue'
import { useFullStore } from '@/stores/usefull/modal'
import { warehouseStore } from '@/stores/warehouse/warehouse'


const selected = ref<any>('containers')
const id = ref<string>('')

const setCurrent = (value: number) => {
  selected.value = value
}
const route = useRoute()
const warehouse = inject<getWarehouse>('warehouse')
const store2 = useFullStore()
const warehouse_store = warehouseStore()


onMounted(async () => {
  if (route.params.id) {
    id.value = route.params.id as string
  }
})

const openMarkups = (value: any) => {
  warehouse_store.getProductMarkups({
    product_id: value.id,
    warehouse_id: route.params.id
  })
  store2.setToggle(true)
}
</script>

