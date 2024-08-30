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
            v-model="title"
            @input="search"
            autocomplete="off"
            class="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="flex-1">
        <Listbox as="div" v-model="selected">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
            Ответственный
          </ListboxLabel>

          <div class="relative mt-2">
            <ListboxButton
              class="relative flex w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
            <span class="flex items-center">
              <span class="block truncate">{{ selected?.lastname }} {{ selected?.username || 'Введите логин' }}</span>
            </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
              <img
                v-show="selected && selected.id"
                class="size-5 !fill-[#9ca3af] ml-auto mt-[3px] cursor-pointer"
                :src="close"
                alt="#"
                @click.stop="clearFilter"
              >
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
                  v-for="person in store.responsibleUser"
                  :key="person.id"
                  @click="filteredUser"
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
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']"
                    >
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
    </div>

    <table-warehouse/>

    <paginate
      v-if="store.warehousesPagination.total_pages"
      :page-count="store.warehousesPagination.total_pages"
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
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { warehouseStore } from '@/stores/warehouse/warehouse'
import { useRoute } from 'vue-router'
import close from '@/assets/close.svg?url'
import tableWarehouse from '@/components/warehouse/tableWarehouse.vue'


const store = warehouseStore()
const warehouse_store = warehouseStore()
const route = useRoute()

const selected = ref<any>(null)
const title = ref<null>()
const timeOut = ref<number | null>(null)

const clearFilter = () => {
  selected.value = null
  refresh()
}

const filteredUser = () => {
  refresh()
}

const clickCallback = async (e: any) => {
  await store.getAllWarehouses({
    limit: 10,
    page: e,
    name: route.query.search ? route.query.search : null,
    user_ids: route.query.user_id ? route.query.user_id : null
  })
}

const search = (e) => {
  const query = e.target.value
  if (timeOut.value !== null) {
    clearTimeout(timeOut.value)
  }

  if (query) {
    timeOut.value = setTimeout(() => {
      refresh()
    }, 500)
  } else {
    title.value = null
    refresh()
  }
}


const refresh = () => {
  warehouse_store.getAllWarehouses({
    user_ids: selected.value?.id,
    limit: 10,
    page: 1,
    name: title.value
  })
}

onMounted(async () => {
  await store.getResponsibleUser({ limit: 30 })
})
</script>

