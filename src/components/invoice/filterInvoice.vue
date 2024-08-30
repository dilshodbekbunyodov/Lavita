<template>
  <div class="flex gap-2">
    <div class="flex-1">
      <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <!-- {{ params }} -->
        <input
          id="search"
          v-model="params.name"
          autocomplete="off"
          class="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <div class="flex-1">
      <!-- {{ user_store.users }} -->
      <Listbox as="div" v-model="selectedUser">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
          >Ответственный</ListboxLabel
        >
        <div class="relative mt-2">
          <ListboxButton
            class="relative flex w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
          >
            <span class="flex items-center">
              <span class="block truncate">
                {{ selectedUser?.lastname }}
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
                v-for="person in user_store.users"
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
                      {{ person.lastname }} {{ person.username }}
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
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Склад</ListboxLabel>
        <div class="relative mt-2">
          <ListboxButton
            class="relative flex w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
          >
            <span class="flex items-center">
              <span class="block truncate"> {{ selectedWarehouse?.name || 'Выберите склад' }}</span>
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
              @click.stop="clearFilterWarehouse"
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
                v-for="warehouse in warehouse_store.warehouses"
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
  <table-invoice />
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref, watch } from 'vue'
import close from '@/assets/close.svg?url'
import tableInvoice from '@/components/invoice/tableInvoice.vue'
import { watchDebounced } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

type Search = {
  user_id: string | number
  name: string
  warehouse_sender_id: string
  status: string
}

const params = ref<Search>({
  user_id: null,
  name: '',
  warehouse_sender_id: null,
  status: route.query.status
})

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const selectedWarehouse = ref<Warehouse>()
import { type Warehouse } from '@/types/warehouse'

import { warehouseStore } from '@/stores/warehouse/warehouse'
const warehouse_store = warehouseStore()
const { warehouses } = storeToRefs(warehouse_store)

const selectedUser = ref<User>()
import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { type User } from '@/types/user'
import { invoiceStore } from '@/stores/invoice/invoice'

const store = invoiceStore()
const user_store = userStore()
onMounted(async () => {
  await user_store.getAllUsers({
    limit: 100
  })
  await warehouse_store.getAllWarehouses({
    limit: 100
  })
})

const clearFilter = () => {
  selectedUser.value = null
  //   refresh()
}

const clearFilterWarehouse = () => {
  selectedWarehouse.value = null
  //   refresh()
}

watch(
  () => route.query.status,
  async () => {
    params.value.status = route.query.status
    await store.getAllInvoices(params.value)
  },
  {
    immediate: true
  }
)

watch(
  () => selectedUser.value,
  async () => {
    if (selectedUser.value) {
      params.value.user_id = selectedUser.value.id
      await store.getAllInvoices(params.value)
    } else {
      params.value.user_id = null
      await store.getAllInvoices(params.value)
    }
  },
  {
    immediate: true
  }
)

watch(
  () => selectedWarehouse.value,
  async () => {
    if (selectedWarehouse.value) {
      params.value.warehouse_sender_id = selectedWarehouse.value.id

      await store.getAllInvoices(params.value)
    } else {
      params.value.warehouse_sender_id = null

      await store.getAllInvoices(params.value)
    }
  },
  {
    immediate: true
  }
)

watchDebounced(
  () => params.value.name,
  async function () {
    if (params.value.name) {
      await store.getAllInvoices(params.value)
    } else {
      await store.getAllInvoices(params.value)
    }
  },
  { deep: true, debounce: 500, maxWait: 5000 }
)
</script>
<style lang=""></style>
