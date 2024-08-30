<template>
  <head-part title="Зарплата" downloadLink="test" />
  <div class="p-6">
    <div class="flex gap-2 mb-5">
      <div class="flex-1">
        <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            autocomplete="off"
            class="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="flex-1">
        <la-select label="Должность" placeholder />
      </div>
      <div class="flex-1">
        <la-select label="Отдел" />
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                    Отдел
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    Текущий баланс
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    Фиксированная выплата
                  </th>

                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only"> </span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="user in users"
                  :key="user"
                  @click="toRoute({ name: 'showsalary', params: { id: user._id } })"
                  class="hover:cursor-pointer"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ user.lastname }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.role }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.department?.title }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2 400 000 сум</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2 000 000 сум</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <div href="#" class="text-indigo-600 hover:text-indigo-900">
                      <ChevronRightIcon class="size-6 text-gray-400" />
                    </div>
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
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
import { type User } from '@/types/user'
const store = userStore()
const { users } = storeToRefs(store)

const router = useRouter()
const toRoute = (obj: toRouteType) => {
  router.push(obj)
}

const getData = async () => {
  await store.getAllUsers({
    limit: 30,
    department: route.params.id?.toString()
  })
}
onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
