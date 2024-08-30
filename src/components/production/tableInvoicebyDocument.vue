<template>
  <div class="mt-6 flex-1 flex flex-col">
    <div class="flex-1 flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
                >
                  №
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                >
                  склад
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                >
                  Общая суммА
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                >
                  ответственный / дата
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                >
                  СТАТУС
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only"> </span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="invoice in store.invoices"
                :key="invoice.id"
                @click="toRoute({ name: 'showinvoice', params: { id: invoice.id || '' } })"
                class="hover:cursor-pointer"
              >
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                >
                  <div class="flex justify-start items-center flex-grow gap-3">
                    <div class="flex flex-col justify-start items-start flex-grow relative">
                      <p
                        class="self-stretch flex-grow-0 flex-shrink-0 w-[177.5px] text-sm font-medium text-left text-gray-900"
                      >
                        {{ invoice.id }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ invoice.warehouse?.address }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{
                    invoice.price
                      ? new Intl.NumberFormat('ru-Ru', {
                        style: 'currency',
                        currency: 'UZS'
                      }).format(invoice.price)
                      : ''
                  }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div class="font-medium text-black">
                    {{ invoice.employee?.lastname }}
                    {{ invoice.employee?.name }}
                  </div>
                  <div class="text-gray-400">
                    {{ convertDate(invoice.updatedAt, 'full') }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      :class="`px-2.5 py-0.5 rounded-[10px] flex-grow-0 flex-shrink-0 text-xs ${invoiceStatus.filter((item) => item.value == invoice.status)[0].class} font-medium text-center `"
                    >
                      {{ invoiceStatus.filter((item) => item.value == invoice.status)[0].title }}
                    </span>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                  <div href="#" class="text-indigo-600 hover:text-indigo-900">
                    <ChevronRightIcon class="size-6 text-gray-400" />
                  </div>
                </td>
              </tr>

              <tr v-if="invoices && invoices.length === 0">
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
  </div>
</template>
<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { invoiceStore } from '@/stores/invoice/invoice'
import { convertDate } from '@/helpers/func'
import { productStore } from '@/stores/production/product'


const productStore2 = productStore()
const store = invoiceStore()

const { invoices, invoices_count } = storeToRefs(store)

import { type toRouteType } from '@/types/api'

const router = useRouter()

const invoiceStatus = [
  {
    title: 'Опубликовано',
    value: 'published',
    class: 'bg-green-100 text-green-800'
  },
  {
    title: 'Черновик',
    value: 'draft',
    class: 'bg-gray-100 text-gray-800'
  },
  {
    title: 'Отменён',
    value: 'canceled',
    class: 'bg-red-100 text-red-800'
  }
]

const toRoute = (obj: toRouteType) => {
  router.push(obj)
}

const getData = async () => {
  let status = route?.query.status as string
  await productStore2.getInvoiceStats({ id: route.params.id, params: { limit: 500 } })
}

const route = useRoute()

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
