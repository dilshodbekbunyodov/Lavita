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
                  v-for="(expense, index) in store.expenseList"
                  :key="index"
                  @click="toRoute({ name: 'showExpense', params: { id: expense.id || '' } })"
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
                          {{ expense?.id }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ expense?.warehouse_receiver_address }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    16 490 990.00 сум
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="font-medium text-black">
                      {{ expense?.lastname }}
                      {{ expense?.username }}
                    </div>
                    <div class="text-gray-400">
                      {{ convertDate(expense?.updated_at, 'full') }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      :class="`px-2.5 py-0.5 rounded-[10px] flex-grow-0 flex-shrink-0 text-xs ${statusClass(expense.status)} font-medium text-center `"
                    >
                      {{ statusTitle(expense.status) }}
                    </span>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <div href="#" class="text-indigo-600 hover:text-indigo-900">
                      <ChevronRightIcon class="size-6 text-gray-400" />
                    </div>
                  </td>
                </tr>

                <tr v-if="store.expenseList && store.expenseList.length === 0">
                  <td colspan="6" class="text-center p-3">
                    <span class="text-sm">Нет данных</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--          <pre>{{movements}}</pre>-->
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
import { expenseStore } from '@/stores/expense/expense.ts'
import { convertDate } from '@/helpers/func'
import { type toRouteType } from '@/types/api'

const store = expenseStore()
const { movements } = storeToRefs(store)
const router = useRouter()
const route = useRoute()

const movementStatus = [
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
  await store.getAllExpense({
    limit: 10,
    status: status
  })
}

const statusClass = (e: any) => {
  const defaultStatus = e
  const statusObj = movementStatus.find((item) => item.value === defaultStatus)
  return statusObj ? statusObj.class : ''
}

const statusTitle = (e: any) => {
  const defaultStatus = e
  const statusObj = movementStatus.find((item) => item.value === defaultStatus)
  return statusObj ? statusObj.title : ''
}

watch(
  () => route.query,
  () => {
    getData()
  }
)

onMounted(() => {
  getData()
})
</script>
