<template>
  <head-part :title="product?.title" backLink="production" />
  <div class="px-6 py-2.5 flex gap-4 items-center bg-white border-b-gray-200 border-b-[1px]">
    <span
      :class="`px-2.5 py-0.5 rounded-[10px] flex-grow-0 flex-shrink-0 text-xs font-medium text-center ${productStatusList[product?.type || 1]?.class}`"
    >
      {{ productStatusList[product?.type || 1]?.title }}
    </span>
    <span class="flex items-center gap-1 text-gray-600">
      <AdjustmentsVerticalIcon class="size-5 text-gray-300" />
      {{ productUnitList[product?.unit - 1 || 1]?.title }}
    </span>
  </div>
  <la-tabs :list="list" />
  <div class="px-4 py-2">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { AdjustmentsVerticalIcon } from '@heroicons/vue/24/solid'
import { type Status } from '@/types/helper'
import { type Product, productStatusList, productUnitList } from '@/types/production/product'

const list = ref<Status[]>([
  {
    title: 'По складам',
    value: 'showproduct_warehouse',
    current: false,
    route: {
      name: 'showproduct_warehouse'
    }
  },
  {
    title: 'По документам',
    value: 'showproduct_documents',
    current: false,
    route: {
      name: 'showproduct_documents'
    }
  }
])

const route = useRoute()
import { productStore } from '@/stores/production/product'
import { onMounted } from 'vue'
const store = productStore()
const product = ref<Product>({
  unit: 1,
  title: ''
})
const getData = async () => {
  let resProduct = await store.getProduct(route.params?.id.toString())
  product.value = resProduct.data
}

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
