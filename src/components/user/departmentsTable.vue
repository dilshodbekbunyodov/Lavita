<template>
  <div class="p-6 flex-1 flex flex-col">
    <div class="flex-1 flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col"
                    class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6">
                    название
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400">
                    Количество сотрудников
                  </th>

                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only"> </span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="department in data" :key="department._id"
                  @click="toRoute({ name: 'department_employee', params: { id: department._id } })"
                  class="hover:cursor-pointer">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ department.title }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ department.employee_count || 0 }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <span
                      class="text-indigo-600 hover:text-indigo-900">
                      <ChevronRightIcon class="size-6 text-gray-400" />
                    </span>
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
import { type Department } from '@/types/user'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

interface Props {
  data: Department[]
}

import { type toRouteType } from '@/types/api'
import { useRouter } from 'vue-router'
const router = useRouter()

const toRoute = (obj: toRouteType) => {
  router.push(obj)
}

defineProps<Props>()
</script>
<style lang=""></style>
