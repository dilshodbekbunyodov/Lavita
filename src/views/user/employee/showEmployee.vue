<template>
  <head-part title="Александр Иванов" backLink="employee">
    <button
      class="py-3 px-3 rounded-lg leading-4 bg-red-100 font-medium text-base hover:bg-red-800 text-red-700 flex items-center"
    >
      Выключить сотрудника
    </button>
  </head-part>
  <div class="px-6 py-2.5 flex gap-4 items-center bg-white border-b-gray-200 border-b-[1px]">
    <span class="bg-green-100 font-medium text-green-800 text-xs px-[10px] py-[2px] rounded">
      Включён
    </span>
    <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/briefcase.svg?url" alt="" />
      Менеджер
    </span>
  </div>
  <la-tabs :list="list" :nostatus="true" />
  <div class="px-6 overflow-auto flex-1">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import type { Status } from '@/types/helper'
import { ref } from 'vue'

const list = ref<Status[]>([
  {
    title: 'Информация',
    value: 'employee_information',
    current: false,
    route: {
      name: 'employee_information'
    }
  },
  {
    title: 'Зарплата',
    value: 'employee_salary',
    current: false,
    route: {
      name: 'employee_salary'
    }
  },
  {
    title: 'График',
    value: 'employee_worktable',
    current: false,
    route: {
      name: 'employee_worktable'
    }
  },
  {
    title: 'Статистика',
    value: 'employee_statistic',
    current: false,
    route: {
      name: 'employee_statistic'
    }
  },
  {
    title: 'Доступы',
    value: 'employee_access',
    current: false,
    route: {
      name: 'employee_access'
    }
  }
])
</script>
<style lang=""></style>
