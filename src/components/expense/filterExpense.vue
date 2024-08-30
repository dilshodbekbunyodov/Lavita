<template>
  <div>
    <div class="flex gap-2">
      <div class="flex-1">
        <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            v-model="search.name"
            autocomplete="off"
            class="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="flex-1">
        <Listbox as="div" v-model="selectedUser">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Ответственный
          </ListboxLabel>
          <div class="relative mt-2">
            <ListboxButton
              class="relative flex w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
            >
              <span class="flex items-center">
                <span class="block truncate"
                  >{{ selectedUser?.lastname }}
                  {{ selectedUser?.username || 'Введите логин' }}</span
                >
              </span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
              >
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
              <img
                v-show="selectedUser && selectedUser.id"
                class="size-5 !fill-[#9ca3af] ml-auto mt-[3px] cursor-pointer"
                :src="close"
                alt="#"
                @click.stop="clearUserFilter"
              />
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="person in userList"
                  :key="person.id"
                  :value="person"
                  v-slot="{ active, selected }"
                >
                  <li
                    :class="[
                      active ? 'bg-blue-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    ]"
                  >
                    <div class="flex items-center">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        {{ person.lastname }}
                        {{ person.username }}
                      </span>
                    </div>

                    <span
                      v-if="selected"
                      :class="[
                        active ? 'text-white' : 'text-blue-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4'
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>

      <div class="flex-1">
        <Listbox as="div" v-model="selectedWarehouse">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
            >Склад</ListboxLabel
          >
          <div class="relative mt-2">
            <ListboxButton
              class="relative flex w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
            >
              <span class="flex items-center">
                <span class="block truncate">
                  {{ selectedWarehouse?.title || 'Выберите склад' }}</span
                >
              </span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
              >
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
              <img
                v-show="selectedWarehouse && selectedWarehouse.id"
                class="size-5 !fill-[#9ca3af] ml-auto mt-[3px] cursor-pointer"
                :src="close"
                alt="#"
                @click.stop="clearFilter"
              />
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="warehouse in warehouses"
                  :key="warehouse.id"
                  :value="warehouse"
                  v-slot="{ active, selected }"
                >
                  <li
                    :class="[
                      active ? 'bg-blue-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    ]"
                  >
                    <div class="flex items-center">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        {{ warehouse.name }}
                      </span>
                    </div>

                    <span
                      v-if="selected"
                      :class="[
                        active ? 'text-white' : 'text-blue-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4'
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
    </div>

    <table-expense />

    <paginate
      v-if="store.expense_count.total_pages"
      :page-count="store.expense_count.total_pages"
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
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import tableExpense from '@/components/expense/tableExpense.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { type Warehouse } from '@/types/warehouse'
import { warehouseStore } from '@/stores/warehouse/warehouse'
import { onMounted, ref } from 'vue'
import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { watchDebounced } from '@vueuse/core'
import { expenseStore } from '@/stores/expense/expense.ts'
import close from '@/assets/close.svg?url'
import { type User } from '@/types/user'
import { useRoute } from 'vue-router'

type Search = {
  name: string
  user_id: string
  warehouse: string
}

const store = expenseStore()
const route = useRoute()
const { movements_count } = storeToRefs(store)
const warehouse_store = warehouseStore()
const { warehouses } = storeToRefs(warehouse_store)
const user_store = userStore()
const { userList } = storeToRefs(user_store)

const search = ref<Search>({
  name: '',
  user_id: '',
  warehouse: ''
})
const selectedWarehouse = ref<Warehouse>()
const selectedUser = ref<User>()

onMounted(async () => {
  await user_store.getUserList({
    limit: 50
  })

  await warehouse_store.getAllWarehouses({
    limit: 50
  })
})

const clearFilter = () => {
  selectedWarehouse.value = null
}

const clearUserFilter = () => {
  selectedUser.value = null
}

const clickCallback = async (e: any) => {
  await store.getAllExpense({
    limit: 10,
    page: e,
    number: search.value.name,
    user_id: selectedUser.value,
    warehouse_sender_id: selectedWarehouse.value
  })
}

watchDebounced(
  () => [search.value.name, selectedUser.value, selectedWarehouse.value],
  async function () {
    let status = route?.query.status as string
    await store.getAllExpense({
      limit: 10,
      status: status,
      number: search.value.name || null,
      user_id: selectedUser?.value?.id || null,
      warehouse_sender_id: selectedWarehouse?.value?.id || null
    })
  },
  { deep: true, debounce: 500, maxWait: 5000 }
)
</script>
