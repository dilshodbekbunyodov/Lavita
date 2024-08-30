<template>
  <head-part
    title="Все товары"
    addLink="createproduct"
    addLinkTitle="Добавить товар"
    downloadLink="product/export"
  />
  <div class="px-6 py-2 flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
    <status-list />
    <filter-product />
    <table-products />
  </div>
</template>
<script setup lang="ts">
import statusList from '@/components/production/statusList.vue'
import filterProduct from '@/components/production/filterProduct.vue'
import tableProducts from '@/components/production/tableProducts.vue'
</script>
<style lang=""></style>
