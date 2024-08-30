<template>
  <head-part
    grayTitle="Склад"
    :title="store.warehouseList?.name"
    backLink="warehouses"
  />

  <div class="px-6 py-2.5 flex gap-4 items-center bg-white border-b-gray-200 border-b-[1px]">
    <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/user.svg?url" alt="" />
      <span v-for="(item, index) in store.warehouseList?.users" :key="index">
        <span class="mr-1">{{ item.username }}</span>
      </span>
    </span>
    <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/location.svg?url" alt="" />
      {{ store.warehouseList?.address }}
    </span>
  </div>

  <la-tabs :list="list" :nostatus="true" />

  <div class="px-6 overflow-auto flex-1">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { type getWarehouse, type Warehouse } from '@/types/warehouse'
import { useRoute } from 'vue-router'
import { type Status } from '@/types/helper'

import { provide } from 'vue'

const list = ref<Status[]>([
  {
    title: 'Содержимое склада',
    value: 'warehouse_products',
    current: false,
    route: {
      name: 'warehouse_products'
    }
  },
  {
    title: 'История',
    value: 'warehouse_history',
    current: false,
    route: {
      name: 'warehouse_history'
    }
  },
  {
    title: 'Настройки',
    value: 'warehouse_settings',
    current: false,
    route: {
      name: 'warehouse_settings'
    }
  }
])

const route = useRoute()
import { warehouseStore } from '@/stores/warehouse/warehouse'

const store = warehouseStore()
const id = ref<string>('')
const warehouse = ref<getWarehouse>()

provide('warehouse', computed(() => store.warehouseList))

onMounted(async () => {
  if (route.params.id) {
    id.value = route.params.id as string
    store.getWarehouseDetail(id.value)

    // warehouse.value = { ...data }
  }
})
</script>
<style lang=""></style>
