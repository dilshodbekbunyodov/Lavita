<template lang="">
  <Listbox as="div" v-model="model">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{
      label
    }}</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
        :class="{
          'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
        }"
      >
        <span class="flex items-center">
          <span class="block truncate">{{ showSelect }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
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
            v-for="item in users"
            :key="item._id"
            :value="item._id"
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
                  >{{ item.lastname || '' }}
                  {{ item.name || '' }}
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
</template>
<script setup lang="ts">
const model = defineModel()
const props = defineProps(['label', 'placeholder', 'error'])

const showSelect = computed(() => {
  let user: User | null = users.value?.find((r: any) => (r._id || r.value) == model.value) || null

  return user ? `${user.lastname} ${user.name}` : props.placeholder || 'Выберите значение'
})

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { ref, onMounted, computed } from 'vue'

import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import type { User } from '@/types/user'
const user_store = userStore()
const { users } = storeToRefs(user_store)

onMounted(async () => {
  await user_store.getAllUsers({
    limit: 0
  })
})
</script>
<style lang=""></style>
