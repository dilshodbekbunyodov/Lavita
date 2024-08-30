<template>
  <div class="flex gap-6 pb-7">
    <div class="flex-1 space-y-6">
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <div class="text-gray-400 text-lg">
            Группа <span class="text-gray-900 font-semibold">Чиланзар-1</span>
          </div>
          <button class="bg-blue-100 text-blue-700 px-[11px] py-[7px] rounded font-medium">
            Изменить
          </button>
        </div>
        <div
          class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow divide-y divide-gray-300"
        >
          <div
            class="flex justify-between items-center w-full px-4 py-3.5 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
          >
            <div class="text-gray-400 text-base">
              Подгруппа <span class="text-gray-900 font-semibold">1 Этаж</span>
            </div>
            <button class="bg-blue-100 text-blue-700 px-[11px] py-[7px] rounded font-medium">
              Изменить
            </button>
          </div>
          <div
            class="flex divide-y divide-gray-300 flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
                  >
                    Сотрудник
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    должность
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    доступ к системе
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    статус
                  </th>
                  <th scope="col" class="relative py-3.5 max-w-14"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item of 3" :key="item">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    <div class="flex justify-start items-center flex-grow gap-3">
                      <div class="flex flex-col justify-start items-start flex-grow relative">
                        <p
                          class="self-stretch flex-grow-0 flex-shrink-0 w-[177.5px] text-sm font-medium text-left text-gray-900"
                        >
                          Александр Иванов
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex w-full rounded-md border-0 py-1.5 text-gray-500">Грузчик</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex w-full rounded-md border-0 py-1.5 bg-white text-blue-600">
                      Есть
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      class="bg-green-100 text-green-800 text-xs font-medium px-[10px] py-[2px] rounded"
                    >
                      Включён
                    </span>
                  </td>

                  <td class="relative whitespace-nowrap py-4 px-4 text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900">
                      <ChevronRightIcon class="size-6 text-gray-400" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-4 py-3 w-full">
            <button
              class="bg-blue-100 text-blue-700 flex gap-1 items-center px-[11px] py-[7px] rounded font-medium"
            >
              <img src="@/assets/icons/plus.svg?url" alt="" />
              Добавить сотрудника
            </button>
          </div>
        </div>
        <div
          class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow divide-y divide-gray-300"
        >
          <div
            class="flex justify-between items-center w-full px-4 py-3.5 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
          >
            <div class="text-gray-400 text-base">
              Подгруппа <span class="text-gray-900 font-semibold">2 Этаж</span>
            </div>
            <button class="bg-blue-100 text-blue-700 px-[11px] py-[7px] rounded font-medium">
              Изменить
            </button>
          </div>
          <div
            class="flex divide-y flex-col justify-center items-center text-gray-500 p-4 self-stretch flex-grow-0 flex-shrink-0"
          >
            Нет сотрудников
          </div>
          <div class="px-4 py-3 w-full">
            <button
              class="bg-blue-100 text-blue-700 flex gap-1 items-center px-[11px] py-[7px] rounded font-medium"
            >
              <img src="@/assets/icons/plus.svg?url" alt="" />
              Добавить сотрудника
            </button>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <div class="text-gray-400 text-lg">
            Группа <span class="text-gray-900 font-semibold">Чиланзар-2</span>
          </div>
          <button class="bg-blue-100 text-blue-700 px-[11px] py-[7px] rounded font-medium">
            Изменить
          </button>
        </div>
        <div
          class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow divide-y divide-gray-300"
        >
          <div
            class="flex justify-between items-center w-full px-4 py-3.5 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
          >
            <div class="text-gray-400 text-base">
              Подгруппа <span class="text-gray-900 font-semibold">1 Этаж</span>
            </div>
            <button class="bg-blue-100 text-blue-700 px-[11px] py-[7px] rounded font-medium">
              Изменить
            </button>
          </div>
          <div
            class="flex divide-y divide-gray-300 flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
                  >
                    Сотрудник
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    должность
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    доступ к системе
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    статус
                  </th>
                  <th scope="col" class="relative py-3.5 max-w-14"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item of 3" :key="item">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    <div class="flex justify-start items-center flex-grow gap-3">
                      <div class="flex flex-col justify-start items-start flex-grow relative">
                        <p
                          class="self-stretch flex-grow-0 flex-shrink-0 w-[177.5px] text-sm font-medium text-left text-gray-900"
                        >
                          Александр Иванов
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex w-full rounded-md border-0 py-1.5 text-gray-500">Грузчик</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex w-full rounded-md border-0 py-1.5 bg-white text-blue-600">
                      Есть
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span class="bg-green-100 text-green-800 text-xs px-[10px] py-[2px] rounded">
                      Включён
                    </span>
                  </td>

                  <td class="relative whitespace-nowrap py-4 px-4 text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900">
                      <ChevronRightIcon class="size-6 text-gray-400" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-4 py-3 w-full">
            <button
              class="bg-blue-100 text-blue-700 flex gap-1 items-center px-[11px] py-[7px] rounded font-medium"
            >
              <img src="@/assets/icons/plus.svg?url" alt="" />
              Добавить сотрудника
            </button>
          </div>
        </div>
      </div>
      <div class="border-t-[1px] border-gray-200 pt-6">
        <button
          class="bg-blue-600 text-white text-sm font-medium flex gap-2 px-[17px] py-[9px] rounded"
        >
          <img src="@/assets/icons/white_plus.svg?url" alt="" />
          Добавить группу
        </button>
      </div>
    </div>
    <div class="w-[290px]">
      <div class="flex flex-col space-y-2">
        <div class="text-gray-900 font-semibold text-lg leading-[28px] mb-2">Выплата</div>
        <div
          class="flex flex-col justify-center items-start overflow-hidden rounded-lg bg-white shadow"
        >
          <div class="flex p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
            <div class="flex flex-col">
              <p class="text-xs font-mediumt uppercase text-gray-400">Общая выплата</p>
              <p class="text-xl font-semibold text-gray-900">16 500 000 сум</p>
            </div>
          </div>
          <div class="flex p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
            <div class="flex flex-col justify-center items-start flex-grow relative">
              <p class="text-xs font-medium uppercase text-gray-400">Текущий баланс</p>
              <p class="text-xl font-semibold text-gray-900">17 500 000 сум</p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col justify-center items-start overflow-hidden rounded-lg bg-white shadow"
        >
          <div class="flex p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
            <div class="flex flex-col">
              <p class="text-xs font-medium uppercase text-gray-400">
                Группа
                <span class="text-gray-900">Чиланзар-1</span>
              </p>
              <p class="text-xl font-semibold text-gray-900">5 000 000 сум</p>
            </div>
          </div>
          <div
            class="flex flex-col gap-3 p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
          >
            <div class="flex flex-col justify-center items-start flex-grow relative">
              <p class="text-xs font-medium uppercase text-gray-400">
                Подгруппа
                <span class="text-gray-900">1 Этаж</span>
              </p>
              <p class="text-base font-medium text-gray-600">2 500 000 сум</p>
            </div>
            <div class="flex flex-col justify-center items-start flex-grow relative">
              <p class="text-xs font-medium uppercase text-gray-400">
                Подгруппа
                <span class="text-gray-900">1 Этаж</span>
              </p>
              <p class="text-base font-medium text-gray-600">2 500 000 сум</p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col justify-center items-start overflow-hidden rounded-lg bg-white shadow"
        >
          <div class="flex p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
            <div class="flex flex-col">
              <p class="text-xs font-medium uppercase text-gray-400">
                Группа
                <span class="text-gray-900">Чиланзар-2</span>
              </p>
              <p class="text-xl font-semibold text-gray-900">5 000 000 сум</p>
            </div>
          </div>
          <div
            class="flex flex-col gap-3 p-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
          >
            <div class="flex flex-col justify-center items-start flex-grow relative">
              <p class="text-xs font-medium uppercase text-gray-400">
                Подгруппа
                <span class="text-gray-900">1 Этаж</span>
              </p>
              <p class="text-base font-medium text-gray-600">2 500 000 сум</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
</script>
<style lang=""></style>
