<template>
  <head-part
    title="Списания"
    addLink="createExpense"
    addLinkTitle="Создать списание"
    downloadLink="invoice/export"
  />

  <la-tabs :list="list" />

  <div class="px-6">
    <filter-expense />

    <!--    <table-movement />-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Status } from '@/types/helper'
import filterExpense from '@/components/expense/filterExpense.vue'
// import tableMovement from '@/components/invoice/tableMovement.vue'

const list = ref<Status[]>([
  {
    title: 'Все статусы',
    value: 0,
    current: false,
    route: {
      name: 'expense'
    }
  },
  {
    title: 'Опубликовано',
    value: 'published',
    current: false,
    route: {
      name: 'expense',
      query: { status: 'published' }
    }
  },
  {
    title: 'Черновики',
    value: 'draft',
    current: false,
    route: {
      name: 'expense',
      query: { status: 'draft' }
    }
  },
  {
    title: 'Отменённые',
    value: 'canceled',
    current: false,
    route: {
      name: 'expense',
      query: { status: 'canceled' }
    }
  }
])
</script>
