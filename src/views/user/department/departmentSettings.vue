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
          <la-input v-model="data.title" label="Название отдела" />
          <la-users v-model="data.employees" label="Ответственные" />
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
import { convertDate } from '@/helpers/func'
import { type Department } from '../../../types/user'
import { userStore } from '@/stores/user/user'
import { type Logger } from '@/types/production/proInvoice'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { CheckCircleIcon, BanknotesIcon } from '@heroicons/vue/24/solid'

const toggle = ref<boolean>(false)

const data = ref<Department>({
  title: ''
})

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
