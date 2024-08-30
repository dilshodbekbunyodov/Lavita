<template>
  <div class="flex gap-6">
    <div class="flex-1">
      <form
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        @submit.prevent="save"
      >
        <div
          class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
        >
          Информация
          <button
            class="bg-blue-100 font-medium text-blue-700 px-[11px] py-[7px] rounded"
            @click="toggle = !toggle"
          >
            Изменить
          </button>
        </div>
        <div class="p-4 space-y-4">
          <la-input v-model="data.name" label="Имя" />
          <la-input v-model="data.name" label="Фамилия" />
          <la-users v-model="data.employees" label="Должность" />
          <la-users v-model="data.employees" label="Отдел" />
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
        </div>
      </form>
    </div>
    <div class="flex-1">
      <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div
          class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
        >
          История
        </div>
        <div class="p-4 border-b-[1px] border-gray-100">
          <div class="grid grid-cols-1 gap-3">
            <div class="flex gap-3" v-for="log of loggers" :key="log._id">
              <div
                :class="{
                  'text-xs text-gray-500 w-8 h-8 flex items-center justify-center rounded-full': true,
                  'bg-green-600': log.action == 'create',
                  'bg-red-600': log.action == 'cancel',
                  'bg-blue-600': log.action == 'cash'
                }"
              >
                <CheckCircleIcon v-if="log.action == 'create'" class="size-5 text-white" />
                <BanknotesIcon v-if="log.action == 'cash'" class="size-5 text-white" />
              </div>
              <div class="text-sm">
                <div class="text-gray-500">
                  {{ log.action == 'cash' ? 'Зарплата' : '' }} изменён на
                  <span class="text-gray-900 font-medium">
                    {{ log.action == 'create' ? 'Опубликовано' : '' }}
                    {{ log.action == 'cancel' ? 'Отменён' : '' }}

                    10 000 000 сум
                  </span>
                  <div>
                    {{ convertDate(log.createdAt, 'full') }}
                  </div>
                  <div>Отредактировал {{ log.user.lastname }} {{ log.user.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { convertDate } from '@/helpers/func'
import { type getUser } from '../../../types/user'
import { userStore } from '@/stores/user/user'
import { type Logger } from '@/types/production/proInvoice'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { CheckCircleIcon, BanknotesIcon } from '@heroicons/vue/24/solid'

const toggle = ref<boolean>(false)

const data = ref<getUser>({})

const loggers = ref<Logger[]>([
  {
    user: {
      lastname: 'Юсупов',
      name: 'Сироджбек',
      login: 'test'
    },
    _id: '123',
    action: 'cash',
    createdAt: new Date()
  }
])

const save = () => {}
</script>
<style lang=""></style>
