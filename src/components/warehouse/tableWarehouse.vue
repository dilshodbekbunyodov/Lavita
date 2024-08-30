<template>
  <div class="mt-5 flex-1 flex flex-col">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-2">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
            <tr>
              <th
                v-for="(item, index) of columns"
                :key="index"
                scope="col"
                :class="`py-2.5 ${index == 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3.5'}  text-left font-medium uppercase text-sm text-gray-400 `"
              >
                {{ item }}
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only"> </span>
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="warehouse in warehouses"
              :key="warehouse.id"
              @click="toRoute({ name: 'warehouse_products', params: { id: warehouse.id } })"
              class="hover:cursor-pointer"
            >
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                {{ warehouse.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span v-for="(item, index) in warehouse.users" :key="index">
                    {{ item.username }}
                    {{ item.lastname }}
                  </span>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ warehouse.address }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div class="font-medium text-gray-900">
                  Товар: {{ warehouse?.product_total_quantity || 0 }} шт.
                </div>
                <div class="font-regular text-gray-500">
                  Тара: {{ warehouse?.container_total_quantity || 0 }} шт.
                </div>
                <div class="font-regular text-gray-500">
                  Детали: {{ warehouse?.part_total_quantity || 0 }} шт.
                </div>
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                <div class="text-indigo-600 hover:text-indigo-900">
                  <ChevronRightIcon class="size-6 text-gray-400" />
                </div>
              </td>
            </tr>

            <tr v-if="warehouses && warehouses.length === 0">
              <td colspan="5" class="text-center p-3">
                <span class="text-sm">Нет данных</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { storeToRefs } from 'pinia'
import { warehouseStore } from '@/stores/warehouse/warehouse'
import { onMounted } from 'vue'


const store = warehouseStore()
const { warehouses } = storeToRefs(store)

const columns = ['название', 'ответственные', 'Адрес', 'Кол-во содержимого']
import { type toRouteType } from '@/types/api'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()


const toRoute = (obj: toRouteType) => {
  router.push(obj)
}

const getData = async () => {
  await store.getAllWarehouses({
    limit: 10,
    page: 1,
    name: route.query.search ? route.query.search : null,
    user_ids: route.query.user_id ? route.query.user_id : null
  })
}

onMounted(() => {
  getData()
})
</script>
<style lang="scss">

</style>
