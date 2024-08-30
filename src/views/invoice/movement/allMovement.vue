<template>
  <head-part
    title="Перемещения"
    addLink="createmovement"
    addLinkTitle="Создать перемещение"
    downloadLink="invoice/export"
  />

  <la-tabs :list="list" />

  <div class="px-6">
    <filter-movement />

    <!--    <table-movement />-->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Status } from '@/types/helper'
import filterMovement from '@/components/invoice/filterMovement.vue'
// import tableMovement from '@/components/invoice/tableMovement.vue'

const list = ref<Status[]>([
  {
    title: 'Все статусы',
    value: 0,
    current: false,
    route: {
      name: 'movements'
    }
  },
  {
    title: 'Опубликовано',
    value: 'published',
    current: false,
    route: {
      name: 'movements',
      query: { status: 'published' }
    }
  },
  {
    title: 'Черновики',
    value: 'draft',
    current: false,
    route: {
      name: 'movements',
      query: { status: 'draft' }
    }
  },
  {
    title: 'Отменённые',
    value: 'canceled',
    current: false,
    route: {
      name: 'movements',
      query: { status: 'canceled' }
    }
  }
])
</script>
