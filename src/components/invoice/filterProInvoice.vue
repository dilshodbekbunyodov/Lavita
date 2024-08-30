<template>
 <div>
   <div class="flex gap-2">

     <div class="flex-1">
       <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
       <div class="relative mt-2 rounded-md shadow-sm">
         <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
           <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
         </div>
         <input v-model="name" @input="searchPro" id="search" autocomplete="off"
                class="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6" />
       </div>
     </div>

     <div class="flex-1">
       <Listbox as="div" v-model="selectedUser">
         <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Ответственный</ListboxLabel>
         <div class="relative mt-2">
           <ListboxButton
             class="relative flex w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
                        <span class="flex items-center">
                            <span class="block truncate">
                                {{ selectedUser?.lastname }}
                                {{ selectedUser?.username || 'Введите логин' }}</span>
                        </span>
             <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
             <img
               v-show="selectedUser && selectedUser.id"
               class="size-5 !fill-[#9ca3af] ml-auto mt-[3px] cursor-pointer"
               :src="close"
               alt="#"
               @click.stop="clearUser"
             >
           </ListboxButton>

           <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                       leave-to-class="opacity-0">
             <ListboxOptions
               class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
               <ListboxOption
                 as="template"
                 v-for="person in userList"
                 :key="person.id" :value="person"
                 v-slot="{ active, selected }"
                 @click="filteredData"
               >
                 <li :class="[
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9'
            ]">
                   <div class="flex items-center">
                                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                            {{ person.lastname }} {{ person.username }}
                                        </span>
                   </div>

                   <span v-if="selected" :class="[
                active ? 'text-white' : 'text-blue-600',
                'absolute inset-y-0 right-0 flex items-center pr-4'
            ]">
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
             class="relative flex w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
                        <span class="flex items-center">
                            <span class="block truncate"> {{ selectedWarehouse?.name || 'Выберите склад' }}</span>
                        </span>
             <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
             <img
               v-show="selectedWarehouse && selectedWarehouse.id"
               class="size-5 !fill-[#9ca3af] ml-auto mt-[3px] cursor-pointer"
               :src="close"
               alt="#"
               @click.stop="clearWarehouse"
             >
           </ListboxButton>

           <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                       leave-to-class="opacity-0">
             <ListboxOptions
               class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
               <ListboxOption
                 as="template"
                 v-for="warehouse in warehouses"
                 :key="warehouse.id"
                 @click="filteredData"
                 :value="warehouse" v-slot="{ active, selected }"
               >
                 <li :class="[
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9'
            ]">
                   <div class="flex items-center">
                                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                            {{ warehouse.name }}
                                        </span>
                   </div>

                   <span v-if="selected" :class="[
                active ? 'text-white' : 'text-blue-600',
                'absolute inset-y-0 right-0 flex items-center pr-4'
            ]">
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

   <table-pro-invoice @refresh="refresh"/>

   <paginate
     v-if="store.proInvoicesPaginate.total_count"
     :page-count="store.proInvoicesPaginate.total_pages"
     :page-range="3"
     :margin-pages="2"
     :click-handler="clickPagination"
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
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref } from 'vue'
import close from '@/assets/close.svg?url'
import { type Warehouse } from '@/types/warehouse'
import { warehouseStore } from '@/stores/warehouse/warehouse'
import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { type User } from '@/types/user'
import { useRoute } from 'vue-router'
import { proInvoiceStore } from '@/stores/invoice/proInvoice'

const store = proInvoiceStore()
const warehouse_store = warehouseStore()
const { warehouses } = storeToRefs(warehouse_store)
const route = useRoute()
const selectedUser = ref<User>()
const user_store = userStore()
const { userList } = storeToRefs(user_store)
import tableProInvoice from '@/components/invoice/tableProInvoice.vue'

const name = ref(null)
const timeOut = ref<number | null>(null)
const selectedWarehouse = ref<Warehouse>()

onMounted(async () => {
  await warehouse_store.getAllWarehouses({
    limit: 50
  })
  await user_store.getUserList({
    limit: 30
  })
})

const refresh = () => {
  let status = route?.query.status as string
  store.getAllProInvoices({
    limit: 10,
    status: status || null,
    number: name.value,
    warehouse_sender_id: selectedWarehouse.value && selectedWarehouse.value?.id,
    user_id: selectedUser.value && selectedUser.value?.id
  })
}


const clearUser = () => {
  selectedUser.value = null
  refresh()
}

const clearWarehouse = () => {
  selectedWarehouse.value = null
  refresh()
}

const filteredData = () => {
  refresh()
}

const searchPro = () => {
  if (timeOut.value !== null) {
    clearTimeout(timeOut.value)
  }
  timeOut.value = setTimeout(() => {
    refresh()
  }, 500)
}

const clickPagination = async (e: any) => {
  let status = route?.query.status as string
  await store.getAllProInvoices({
    limit: 10,
    page: e,
    status: status || null,
    number: name.value,
    warehouse_sender_id: selectedWarehouse.value && selectedWarehouse.value?.id,
    user_id: selectedUser.value && selectedUser.value?.id
  })
}
</script>

