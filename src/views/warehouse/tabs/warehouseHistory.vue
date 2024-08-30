<template>
  <div>
    <div class="bg-white mb-3 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
      <!--    <pre>{{ store.warehouseHistory }}</pre>-->
      <div
        class="px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
      >
        <div class="py-4">История</div>
        <la-tabs :list="historyList" :nop="true" />
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
          <th scope="col" class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400">
            остаток
          </th>
          <th scope="col" class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400">
            Последнее обновление
          </th>
          <th scope="col" class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400">
            статус
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-for="(item, index) in store.warehouseHistory"
          :key="index"
          class="font-redular text-gray-500 text-sm"
        >
          <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
            <div class="text-green-600 font-medium">Накладная</div>
            #{{ item.number }}
          </td>
          <td class="whitespace-nowrap px-3 py-4">{{ item.price }} сум</td>
          <td class="whitespace-nowrap px-3 py-4">
            <div class="text-gray-900 font-medium">{{ item.user_full_name }}</div>
            {{ convertDate(item.updated_at) }}
          </td>
          <td class="whitespace-nowrap px-3 py-4">
            <span v-if="item.status === 'draft'" class="bg-[#ccc]  inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10">Черновик</span>
            <span v-if="item.status === 'published'" class="bg-[#D1FAE5] p-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10">Опубликовано</span>
            <span v-if="item.status === 'canceled'" class="bg-[#DC2626] p-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10">Отменено</span>
          </td>
        </tr>

        <tr v-if="store.warehouseHistory && store.warehouseHistory.length === 0">
          <td colspan="5" class="text-center p-3">
            <span class="text-sm">Нет данных</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <paginate
      v-if="store.warehouseHistoryPagination.total_pages"
      :page-count="store.warehouseHistoryPagination.total_pages"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :container-class="'pagination_next shadow'"
      :page-class="'page-item'"
      :prev-text="'<'"
      :next-text="'>'"
      :prev-class="'pagination-button'"
      :next-class="'pagination-button'"
      :active-class="'active'"
      :disabled-class="'disabled'"
    />
  </div>
</template>
<script setup lang="ts">
import { convertDate } from '@/helpers/func'
import { historyList } from '@/types/helper'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { proInvoiceStore } from '@/stores/invoice/proInvoice'

const store = proInvoiceStore()

const route = useRoute()
const id = ref<string>('')

onMounted(async () => {
  if (route.params.id) {
    id.value = route.params.id as string
    // await store.getAllProInvoices({
    //   warehouse: id.value,
    //   limit: 30
    // })
    await store.getAllHistory({
      warehouse_id: route.params.id,
      limit: 10
    })
  }
})

const clickCallback = async (e: any) => {
  await store.getAllHistory({
    limit: 10,
    page: e,
    warehouse_id: route.params.id
  })
}
</script>
<style lang=""></style>
