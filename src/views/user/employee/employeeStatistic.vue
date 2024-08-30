<template>
  <div class="flex gap-4 mb-6">
    <div class="flex-1 justify-center items-start overflow-hidden rounded-lg bg-white shadow">
      <div class="flex p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
        <div class="flex flex-col">
          <p class="text-xs font-mediumt uppercase text-gray-400">Всего выплат</p>
          <p class="text-xl font-semibold text-gray-900">16 500 000 сум</p>
        </div>
      </div>
    </div>
    <div class="flex-1 justify-center items-start overflow-hidden rounded-lg bg-white shadow">
      <div class="flex p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
        <div class="flex flex-col">
          <p class="text-xs font-mediumt uppercase text-gray-400">Текущий баланс</p>
          <p class="text-xl font-semibold text-gray-900">10 500 000 сум</p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow divide-y divide-gray-300"
  >
    <div
      class="flex gap-[26px] items-center w-full px-4 py-3.5 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
    >
      <div class="text-gray-900 font-semibold text-base">История</div>
      <nav class="flex space-x-1 bg-gray-200 p-0.5 rounded-md" aria-label="Tabs">
        <button
          type="button"
          v-for="tab in list"
          :key="tab.title"
          @click="setCurrent(+tab.value)"
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
    <div class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
            >
              сумма
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
            >
              Фикс
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
            >
              %
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
            >
              Тип
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
            >
              Дата
            </th>
            <th scope="col" class="relative py-3.5 max-w-14"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item of 3" :key="item">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              <div class="flex justify-start items-center flex-grow gap-3">
                <div class="flex flex-col justify-start items-start flex-grow relative">
                  <p
                    class="self-stretch flex-grow-0 flex-shrink-0 w-[177.5px] text-sm font-medium text-left text-gray-900"
                  >
                    16 500 000 сум
                  </p>
                </div>
              </div>
            </td>

            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="flex w-full rounded-md border-0 py-1.5 text-gray-500">16 000 000 сум</div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="flex w-full rounded-md border-0 py-1.5">-</div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span
                class="bg-green-100 text-green-800 text-xs font-medium px-[10px] py-[2px] rounded"
              >
                Начисление
              </span>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="flex w-full rounded-md border-0 py-1.5">16 июн. 2024</div>
            </td>
            <td class="py-4 px-4 text-right">
              <button
                class="p-2 rounded ring-1 ring-inset ring-gray-200 white-invert hover:ring-red-400 hover:bg-red-500"
              >
                <img src="@/assets/icons/trash.svg?url" alt="" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<number>(1)

const list = [
  {
    title: 'Начисления',
    value: 1
  },
  {
    title: 'Выплаты',
    value: 2
  }
]

const setCurrent = (value: number) => {
  selected.value = value
}
</script>
<style lang=""></style>
