<template>
  <head-part
    title="Прозводственные накладные"
    addLink="createproinvoice"
    addLinkTitle="Создать"
    downloadLink="productinvoice/export"
  />

  <la-tabs :list="list" />

  <div class="px-6">
    <filter-pro-invoice />
<!--    <table-pro-invoice />-->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { type Status } from '@/types/helper'
import filterProInvoice from '@/components/invoice/filterProInvoice.vue'
import tableProInvoice from '@/components/invoice/tableProInvoice.vue'

const list = ref<Status[]>([
  {
    title: 'Все статусы',
    value: 0,
    current: false,
    route: {
      name: 'proinvoice'
    }
  },
  {
    title: 'Опубликовано',
    value: "published",
    current: false,
    route: {
      name: 'proinvoice',
      query: { 'status': 'published' }
    }
  },
  {
    title: 'Черновики',
    value: "draft",
    current: false,
    route: {
      name: 'proinvoice',
      query: { 'status': 'draft' }
    }
  },
  {
    title: 'Отменённые',
    value: "canceled",
    current: false,
    route: {
      name: 'proinvoice',
      query: { 'status': 'canceled' }
    }
  }

])

</script>
<style lang="">

</style>
