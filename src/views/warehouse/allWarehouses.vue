<template>
  <head-part
      title="Все склады"
      addLink="createwarehouse"
      addLinkTitle="Добавить склад"
  />
  <div class="p-6 flex-1 flex flex-col overflow-x-hidden ">
    <filter-warehouse/>
<!--    <table-warehouse/>-->
  </div>
</template>
<script setup lang="ts">
import filterWarehouse from '@/components/warehouse/filterWarehouse.vue'
// import tableWarehouse from '@/components/warehouse/tableWarehouse.vue'
</script>

