<template>
  <head-part grayTitle="Зарплата" title="Александр Иванов" backLink="salary" />
  <div class="px-6 py-2.5 flex gap-4 items-center bg-white border-b-gray-200 border-b-[1px]">
    <span class="bg-green-100 font-medium text-green-800 text-xs px-[10px] py-[2px] rounded">
      Включён
    </span>
    <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/briefcase.svg?url" alt="" />
      Курьер
    </span>
  </div>
  <div class="flex gap-6 p-6">
    <div class="flex-1 space-y-6">
      <div
        class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow divide-y divide-gray-300"
      >
        <div
          class="flex justify-between items-center w-full px-4 py-3.5 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
        >
          <div class="text-gray-900 font-semibold text-base">История начислений</div>
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
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                >
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
                  <div class="flex w-full rounded-md border-0 py-1.5 text-gray-500">
                    16 000 000 сум
                  </div>
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
    </div>
    <div class="w-[290px] space-y-6">
      <div
        class="flex flex-col justify-center items-start overflow-hidden rounded-lg bg-white shadow"
      >
        <div class="flex p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
          <div class="flex flex-col">
            <p class="text-xs font-mediumt uppercase text-gray-400">Общая выплата</p>
            <p class="text-xl font-semibold text-gray-900">16 500 000 сум</p>
          </div>
        </div>
      </div>

      <form
        class="bg-white shadow ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        @submit.prevent="save"
      >
        <div
          class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
        >
          Добавить премию
        </div>
        <div class="p-4 space-y-4">
          <div
            class="flex w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
          >
            <input
              v-maska="'###############'"
              autocomplete="off"
              class="block w-full border-0 bg-none ring-0 placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6"
            />
            <span class="text-gray-500 text-sm"> сум </span>
          </div>
          <button class="bg-blue-100 font-medium text-blue-700 px-[11px] py-[7px] rounded">
            Добавить
          </button>
        </div>
      </form>

      <form
        class="bg-white shadow ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        @submit.prevent="save"
      >
        <div
          class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
        >
          Начислить штраф
        </div>
        <div class="p-4 space-y-4">
          <div
            class="flex w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
          >
            <input
              v-maska="'###############'"
              autocomplete="off"
              class="block w-full border-0 bg-none ring-0 placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6"
            />
            <span class="text-gray-500 text-sm"> сум </span>
          </div>
          <button class="bg-blue-100 font-medium text-blue-700 px-[11px] py-[7px] rounded">
            Начислить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
const save = () => {}
</script>
<style lang=""></style>
