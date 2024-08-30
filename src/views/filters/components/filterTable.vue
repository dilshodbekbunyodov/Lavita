<template>
  <div class="mt-6">
    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
          >
            Название
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
          >
            Дата получения
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
          >
            Кол-во маркировок
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
          >
            Использовано
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
          >
            Не использовано
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
          >
            статус
          </th>

          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only"> </span>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-for="(item, index) in store.filterList"
          :key="index"
          @click="toRoute({ name: 'showfilters', params: { id: item.id } })"
          class="hover:cursor-pointer"
        >
          <td
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
          >
            {{ item.name }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {{ convertDate(item.date_of_receive, 'full') }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {{ item.quantity }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {{ item.is_po }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {{ item.ni_po }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    :class="item.is_active ? 'bg-green-100' : 'bg-[#FEE2E2]'"
                    class="font-medium text-green-800 text-xs px-[10px] py-[2px] rounded"
                  >
                       {{ item.is_active ? 'Активные' : 'Неактыные' }}
                    </span>
          </td>
          <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
            <div href="#" class="text-indigo-600 hover:text-indigo-900">
              <ChevronRightIcon class="size-6 text-gray-400" />
            </div>
          </td>
        </tr>

        <tr v-if="store.filterList && store.filterList.length === 0">
          <td colspan="7" class="text-center p-3">
            <span class="text-sm">Нет данных</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { type toRouteType } from '@/types/api'
import { useRouter } from 'vue-router'
import { filtersStore } from '@/stores/filters/filters'
import { convertDate } from '../../../helpers/func'

const store = filtersStore()
const router = useRouter()

const toRoute = (obj: toRouteType) => {
  router.push(obj)
}
</script>

