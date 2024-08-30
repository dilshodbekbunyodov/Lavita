<template>
<!--  <pre>{{ store.warehouseList }}</pre>-->
  <div class="flex w-full gap-6">
    <form
      class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-[40%]"
      @submit.prevent="save"
    >
      <div class="pb-4">
        <div class="flex items-center justify-between py-3 px-4 font-semibold border-b-[1px] border-gray-200">
          <div class="text-[#111827]">Информация</div>

          <button
            type="submit"
            class="text-sm mt-1 px-[11px] py-[5px] font-medium text-center rounded bg-blue-600 text-white disabled:cursor-not-allowed"
          >
            Сохранить
          </button>
        </div>

        <div class="px-4 mt-2">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Название</label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input
              id="name"
              autocomplete="off"
              v-model="data.title"
              placeholder="Введите название склада"
              class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="mt-4">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
              Адрес скалад
            </label>
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
              <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                Ответственные
              </ListboxLabel>
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <span class="block truncate" v-if="list && list.length > 0">
                    <span
                      v-for="item of list"
                      :key="item"
                      class="bg-blue-100 rounded-lg px-2.5 py-0.5 mr-1 text-blue-800"
                    >
                      {{item.username}}
                      {{ user_store.responsibleUser.find((user) => user.id == item)?.lastname }}
                      {{ user_store.responsibleUser.find((user) => user.id == item)?.username }}
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
                      v-for="user in user_store.responsibleUser"
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
                        >
                          {{ user.lastname }} {{ user.username }}
                        </span>
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
        </div>
      </div>
    </form>

    <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-[40%]">
      <div class="pb-4">
        <div class="flex items-center justify-between py-3 px-4 font-semibold border-b-[1px] border-gray-200">
          <div class="text-[#111827]">История</div>
        </div>

        <div class="px-4 mt-2">
          <div v-for="(item, index) in store.warehouseHistory" :key="index" class="flex gap-x-3">
            <div
              class="relative last:after:hidden after:absolute after:top-9 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-[#E5E7EB] dark:after:bg-[#E5E7EB]">
              <div class="relative z-10 size-7 flex justify-center items-center mt-3">
                <div v-show="item?.status === 'published'" class="bg-[#059669] p-3 rounded-[100%]">
                  <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM11.707 6.707C11.8892 6.5184 11.99 6.2658 11.9877 6.0036C11.9854 5.7414 11.8802 5.49059 11.6948 5.30518C11.5094 5.11977 11.2586 5.0146 10.9964 5.01233C10.7342 5.01005 10.4816 5.11084 10.293 5.293L7 8.586L5.707 7.293C5.5184 7.11084 5.2658 7.01005 5.0036 7.01233C4.7414 7.0146 4.49059 7.11977 4.30518 7.30518C4.11977 7.49059 4.0146 7.7414 4.01233 8.0036C4.01005 8.2658 4.11084 8.5184 4.293 8.707L6.293 10.707C6.48053 10.8945 6.73484 10.9998 7 10.9998C7.26516 10.9998 7.51947 10.8945 7.707 10.707L11.707 6.707Z"
                          fill="white" />
                  </svg>
                </div>

                <svg v-show="item?.status === 'draft'" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_940_793)">
                    <rect x="8" y="8" width="32" height="32" rx="16" fill="#6B7280"/>
                    <path d="M22 17C22 16.7348 22.1054 16.4804 22.2929 16.2929C22.4804 16.1054 22.7348 16 23 16H25C25.2652 16 25.5196 16.1054 25.7071 16.2929C25.8946 16.4804 26 16.7348 26 17C26 17.2652 25.8946 17.5196 25.7071 17.7071C25.5196 17.8946 25.2652 18 25 18H23C22.7348 18 22.4804 17.8946 22.2929 17.7071C22.1054 17.5196 22 17.2652 22 17Z" fill="white"/>
                    <path d="M20 17C19.4696 17 18.9609 17.2107 18.5858 17.5858C18.2107 17.9609 18 18.4696 18 19V30C18 30.5304 18.2107 31.0391 18.5858 31.4142C18.9609 31.7893 19.4696 32 20 32H28C28.5304 32 29.0391 31.7893 29.4142 31.4142C29.7893 31.0391 30 30.5304 30 30V19C30 18.4696 29.7893 17.9609 29.4142 17.5858C29.0391 17.2107 28.5304 17 28 17C28 17.7956 27.6839 18.5587 27.1213 19.1213C26.5587 19.6839 25.7956 20 25 20H23C22.2044 20 21.4413 19.6839 20.8787 19.1213C20.3161 18.5587 20 17.7956 20 17Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_940_793" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feMorphology radius="8" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_940_793"/>
                      <feOffset/>
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_940_793"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_940_793" result="shape"/>
                    </filter>
                  </defs>
                </svg>

                <svg v-if="item?.status === 'canceled'" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_940_1626)">
                    <rect x="8" y="8" width="32" height="32" rx="16" fill="#DC2626"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.293 18.293C18.4806 18.1055 18.7349 18.0002 19 18.0002C19.2652 18.0002 19.5195 18.1055 19.707 18.293L24 22.586L28.293 18.293C28.3853 18.1975 28.4956 18.1213 28.6176 18.0689C28.7396 18.0165 28.8709 17.9889 29.0036 17.9878C29.1364 17.9866 29.2681 18.0119 29.391 18.0622C29.5139 18.1125 29.6255 18.1867 29.7194 18.2806C29.8133 18.3745 29.8876 18.4862 29.9379 18.6091C29.9881 18.7319 30.0134 18.8636 30.0123 18.9964C30.0111 19.1292 29.9835 19.2604 29.9311 19.3824C29.8787 19.5044 29.8025 19.6148 29.707 19.707L25.414 24L29.707 28.293C29.8892 28.4816 29.99 28.7342 29.9877 28.9964C29.9854 29.2586 29.8803 29.5094 29.6948 29.6948C29.5094 29.8802 29.2586 29.9854 28.9964 29.9877C28.7342 29.99 28.4816 29.8892 28.293 29.707L24 25.414L19.707 29.707C19.5184 29.8892 19.2658 29.99 19.0036 29.9877C18.7414 29.9854 18.4906 29.8802 18.3052 29.6948C18.1198 29.5094 18.0146 29.2586 18.0124 28.9964C18.0101 28.7342 18.1109 28.4816 18.293 28.293L22.586 24L18.293 19.707C18.1056 19.5195 18.0002 19.2652 18.0002 19C18.0002 18.7348 18.1056 18.4805 18.293 18.293Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_940_1626" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feMorphology radius="8" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_940_1626"/>
                      <feOffset/>
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_940_1626"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_940_1626" result="shape"/>
                    </filter>
                  </defs>
                </svg>

              </div>
            </div>

            <p class="flex text-sm text-gray-400 mb-4 w-[25%] ml-2">
              Статус изменён на {{convertDate(item?.updated_at)}} {{item?.user_full_name}}
            </p>

            <div class="font-semibold">
              <span v-if="item.status == 'draft'">Черновики</span>
              <span v-if="item.status == 'canceled'">Отменённые</span>
              <span v-if="item.status == 'published'">Опубликовано</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Warehouse } from '@/types/warehouse'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { convertDate } from '@/helpers/func'

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

const id = ref<string>('')
const data = ref<Warehouse>({
  warehouse_id: '',
  title: '',
  address: '',
  users: []
})

import { warehouseStore } from '@/stores/warehouse/warehouse'

const route = useRoute()
const store = warehouseStore()

const save = async () => {
  await store.saveWarehouse({
    params: {
      name: data.value.title,
      address: data.value.address,
      user_ids: [...list.value]
    },
    warehouse_id: route.params.id
  })
}

import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const user_store = userStore()
const { users } = storeToRefs(user_store)

onMounted(async () => {
  await user_store.getResponsibleUser({
    limit: 30
  })
  id.value = route.params.id as string
  await store.getWarehouseHistory({
    warehouse_id: id.value
  })
})


watch(() => store.warehouseList, (value) => {
    data.value.title = value.name
    data.value.address = value.address

    // list.value = value.users
  }, { immediate: true }
)
</script>

