<template>
  <div class="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-4">
    <div
      class="flex justify-start items-center flex-grow overflow-hidden gap-3 p-4 rounded-lg bg-white"
      style="
        box-shadow:
          0px 1px 3px 0 rgba(0, 0, 0, 0.1),
          0px 1px 2px 0 rgba(0, 0, 0, 0.06);
      "
    >
      <div class="flex flex-col justify-start items-start self-stretch flex-grow relative">
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[511px] text-sm font-medium text-left text-gray-500"
        >
          Общее кол-во по всем складам
        </p>
        <div
          class="flex justify-start items-end self-stretch flex-grow-0 flex-shrink-0 relative gap-2"
        >
          <p class="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-left text-gray-900">
            {{ store.warehouseStats.total_quantity ? store.warehouseStats.total_quantity : 0 }} шт.
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex justify-start items-center flex-grow overflow-hidden gap-3 p-4 rounded-lg bg-white"
      style="
        box-shadow:
          0px 1px 3px 0 rgba(0, 0, 0, 0.1),
          0px 1px 2px 0 rgba(0, 0, 0, 0.06);
      "
    >
      <div class="flex flex-col justify-start items-start self-stretch flex-grow relative">
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[511px] text-sm font-medium text-left text-gray-500"
        >
          Общая сумма
        </p>
        <div
          class="flex justify-start items-end self-stretch flex-grow-0 flex-shrink-0 relative gap-2"
        >
          <p class="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-left text-gray-900">

            {{ new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(store.warehouseStats.total_sum) }} сум
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="grid grid-cols-2 flex-wrap w-full justify-start items-start flex-grow-0 flex-shrink-0 mt-5 gap-4 pt-5 border-t border-r-0 border-b-0 border-l-0 border-gray-300"
  >
    <div
      class="justify-center items-start gap-3 flex flex-col p-4 rounded-lg bg-white shadow-md cursor-pointer"
      v-for="(item, index) in store.warehouseStats.warehouse_data"
      :key="index"
      @click="$router.push({name: 'warehouse_products', params: {id: item.id}})"
    >
      <div class="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 relative">
        <div class="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1">
          <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-0.5">
            <CubeIcon class="size-4 text-gray-400" />
            <p class="flex-grow-0 flex-shrink-0 text-base text-left text-gray-500">Склад</p>
          </div>
          <p class="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-gray-900">
            {{ item.name ? item.name : '' }}
          </p>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M9 5L16 12L9 19"
            stroke="#D1D5DB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
      <div class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0">
        <div class="flex flex-col justify-center items-start flex-grow relative">
          <p
            class="flex-grow-0 flex-shrink-0 text-xs font-medium text-left uppercase text-gray-400"
          >
            Количесчтво
          </p>
          <p class="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-gray-900">
            {{ item.total_quantity ? item.total_quantity.toLocaleString('en-US') : 0 }} шт.
          </p>
        </div>
        <div class="flex flex-col justify-center items-start flex-grow relative">
          <p
            class="flex-grow-0 flex-shrink-0 text-xs font-medium text-left uppercase text-gray-400"
          >
            сумма
          </p>
          <p class="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-gray-900">
            {{ new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(item.total_sum) }} сум
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CubeIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productStore } from '@/stores/production/product'

const store = productStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    // console.log(route.params)
    await store.getWarehouseStats(route.params.id)
  } catch (err) {

  }
})
</script>
<style lang=""></style>
