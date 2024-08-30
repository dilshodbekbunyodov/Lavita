<template>
  <div class="p-6">
    <div class="max-w-md">
      <form
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        @submit.prevent="save"
      >
        <div class="p-4">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Название</label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              id="name"
              autocomplete="off"
              v-model="data.name"
              placeholder="Введите название склада"
              class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="mt-4">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Адрес скалад</label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                autocomplete="off"
                v-model="data.address"
                placeholder="Введите адрес"
                class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="mt-4">
            <Listbox as="div" v-model="selected">
              <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Ответственные</ListboxLabel>
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <span class="block truncate" v-if="list.length > 0">
                    <span
                      v-for="item of list"
                      :key="item"
                      class="bg-blue-100 rounded-lg px-2.5 py-0.5 mr-1 text-blue-800"
                    >
                      {{ store.responsibleUser.find((user) => user.id == item)?.lastname }}
                      {{ store.responsibleUser.find((user) => user.id == item)?.username }}
                    </span>
                  </span>
                  <span class="block truncate" v-else>Выберите из списка</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      as="template"
                      v-for="user in store.responsibleUser"
                      :key="user.id"
                      :value="user.id"
                      @click="setSelected(user.id)"
                    >
                      <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9">
                        <span
                          :class="[
                            list.includes(user.id || '') ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          ]"
                        >{{ user.lastname }} {{ user.username }}</span
                        >

                        <span
                          v-if="list.includes(user.id || '')"
                          :class="[
                            list.includes(user.id || '') ? 'text-white' : 'text-indigo-600',
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
          <div class="mt-4 flex">
            <button
              type="submit"
              :disabled="!isButtonActive"
              :class="!isButtonActive ? 'bg-[#eee] hover:bg-[#eee]' : ''"
              class="rounded-md flex-1 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Создать склад
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Warehouse } from '@/types/warehouse'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const selected = ref<string[]>([])
const list = ref<string[]>([])
const setSelected = (id: string | undefined) => {
  if (id == undefined) return false
  let index = list.value?.findIndex((sel) => sel == id)
  if (index == -1) {
    list.value.push(id)
  } else {
    list.value.splice(index, 1)
  }
}

const data = ref<Warehouse>({
  name: '',
  address: ''
})

import { warehouseStore } from '@/stores/warehouse/warehouse'

const store = warehouseStore()

const isButtonActive = computed(() => {
  return !!(data.value.name && data.value.address && selected && selected.value)
})

const save = async () => {
  await store.addWarehouse({ ...data.value, user_ids: [...list.value] })
}

import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const user_store = userStore()
const { users } = storeToRefs(user_store)

onMounted(async () => {
  await store.getResponsibleUser()
  await user_store.getAllUsers({
    limit: 30
  })
})
</script>
