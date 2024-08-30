<template>
  <div class="flex gap-6">
    <div class="flex-1">
      <div class="flex-1">
        <form
          class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          @submit.prevent="save"
        >
          <div
            class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
          >
            Заработная плата
            <div class="space-x-2">
              <button
                class="font-medium ring-1 ring-inset ring-gray-200 text-gray-900 bg-white px-[11px] py-[7px] rounded shadow-sm"
              >
                Отмена
              </button>
              <button class="font-medium text-white bg-indigo-600 px-[11px] py-[7px] rounded">
                Сохранить
              </button>
            </div>
          </div>
          <div class="p-4 space-y-4">
            <la-select label="Тип подсчета" />
            <la-input
              v-model="data.name"
              label="Фиксированной З/П"
              suffix="сум"
              placeholder="1 600 000 "
            />
            <la-input
              v-model="data.name"
              label="Размер KPI за каждый проданный товар"
              suffix="сум"
              placeholder="10 000"
            />
            <la-input
              v-model="data.name"
              label="Процентный бонус с продаж"
              suffix="%"
              placeholder="1"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="flex-1">
      <form
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        @submit.prevent="save"
      >
        <div
          class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
        >
          Авто-премия
          <button
            class="bg-blue-100 font-medium text-blue-700 px-[11px] py-[7px] rounded"
            @click="toggle = !toggle"
          >
            Изменить
          </button>
        </div>
        <div class="p-4 space-y-4">
          <div class="flex gap-2 items-center">
            <la-checkbox />
            <div class="font-medium text-sm">Премия</div>
          </div>
          <la-select label="Тип премии" placeholder="За KPI" />
          <la-input label="Сумма KPI" placeholder="10 000" suffix="сум" />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckCircleIcon, BanknotesIcon } from '@heroicons/vue/24/solid'
import { vMaska } from 'maska/vue'
import { convertDate } from '@/helpers/func'
import { type getUser } from '../../../types/user'
import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const toggle = ref<boolean>(false)
const data = ref<getUser>({})

const save = () => {}
</script>
<style lang=""></style>
