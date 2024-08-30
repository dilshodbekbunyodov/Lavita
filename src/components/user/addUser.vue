<template>
  <TransitionRoot as="template" :show="toggle">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900"
                >Добавить сотрудника</DialogTitle
              >
              <div class="mt-4">
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
                  >Имя</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="name"
                    autocomplete="off"
                    v-model="data.name"
                    @keypress.enter="send"
                    placeholder="Введите имя"
                    class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900"
                  >Фамилия</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="lastname"
                    autocomplete="off"
                    v-model="data.lastname"
                    placeholder="Введите фамилия"
                    class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label for="phone" class="block text-sm font-medium leading-6 text-gray-900"
                  >Номер телефона</label
                >
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-inset ring-gray-300 focus-within:ring-inset sm:text-sm"
                  >
                    <span
                      class="flex select-none rounded-l-md border-0 items-center px-3 text-gray-500 ring-1 ring-gray-300 bg-gray-100"
                      >+998</span
                    >
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      v-model="data.phone"
                      v-maska="'## ### ## ##'"
                      class="block flex-1 rounded-r-md ring-1 ring-gray-300 border-0 bg-transparent py-1.5 pl-3 text-gray-900 focus:outline-0 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:leading-6"
                      placeholder="93 459 43 21"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <Listbox as="div" v-model="selected">
                  <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
                    >Должность</ListboxLabel
                  >
                  <div class="relative mt-2">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                    >
                      <span class="flex items-center">
                        <span class="block truncate">{{
                          roles.find((r) => r.value == selected)?.name || 'Выберите значение'
                        }}</span>
                      </span>
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
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
                        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          as="template"
                          v-for="person in roles"
                          :key="person.id"
                          :value="person.value"
                          v-slot="{ active, selected }"
                        >
                          <li
                            :class="[
                              active ? 'bg-blue-600 text-white' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9'
                            ]"
                          >
                            <div class="flex items-center">
                              <span
                                :class="[
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate'
                                ]"
                                >{{ person.name }}</span
                              >
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
              <div class="mt-4">
                <label for="login" class="block text-sm font-medium leading-6 text-gray-900"
                  >Логин</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="login"
                    autocomplete="off"
                    v-model="data.login"
                    placeholder="Введите логин"
                    class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                  >Пароль</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="password"
                    autocomplete="off"
                    v-model="data.password"
                    :type="toggleType ? 'text' : 'password'"
                    placeholder="Введите пароль"
                    class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    @click="toggleType = !toggleType"
                    class="absolute bottom-0 right-0 inline-flex p-2"
                  >
                    <EyeIcon v-if="!toggleType" class="size-5 text-gray-400" />
                    <EyeSlashIcon v-else class="size-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div class="mt-6 flex flex-row">
                <button
                  type="button"
                  class="mt-3 flex-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="close"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  class="inline-flex flex-1 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="send"
                  :disabled="data.name?.length == 0"
                >
                  Добавить сотрудника
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { vMaska } from 'maska/vue'

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import { type setUser } from '@/types/user'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'
import { useFullStore } from '@/stores/usefull/modal'
const usefullStore = useFullStore()
const { toggle } = storeToRefs(usefullStore)

const data = ref<setUser>({
  name: ''
})

const selected = ref('')

const roles = [
  {
    id: 1,
    name: 'Сотрудник',
    value: 'manager'
  },
  {
    id: 2,
    name: 'Курьер',
    value: 'delivery'
  },
  {
    id: 3,
    name: 'Бухгалтер',
    value: 'moneyman'
  }
]
const toggleType = ref<boolean>(false)
const route = useRoute()
const emit = defineEmits(['send'])
const send = () => {
  console.log(data.value)
  console.log(selected.value)

  if (data.value.name?.length == 0) return false
  emit('send', { ...data.value,  role: selected.value })
  close()
}

const close = () => {
  data.value = {}
  selected.value = ''
  usefullStore.setToggle(false)
}
</script>
