<template>
  <head-part
    title="Накладные"
    addLink="createinvoice"
    addLinkTitle="Создать накладную"
    downloadLink="invoice/export"
  />
  <la-tabs :list="list" />
  <div class="px-6">
    <filter-invoice />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { type Status } from '@/types/helper'
import filterInvoice from '@/components/invoice/filterInvoice.vue'

const list = ref<Status[]>([
  {
    title: 'Все статусы',
    value: 0,
    current: false,
    route: {
      name: 'invoices'
    }
  },
  {
    title: 'Опубликовано',
    value: 'published',
    current: false,
    route: {
      name: 'invoices',
      query: { status: 'published' }
    }
  },
  {
    title: 'Черновики',
    value: 'draft',
    current: false,
    route: {
      name: 'invoices',
      query: { status: 'draft' }
    }
  },
  {
    title: 'Отменённые',
    value: 'canceled',
    current: false,
    route: {
      name: 'invoices',
      query: { status: 'canceled' }
    }
  }
])
</script>
<style lang=""></style>
