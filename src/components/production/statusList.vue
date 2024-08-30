<template>
  <div class="mb-6">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Выберите</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option v-for="tab in productStatusList2" :key="tab.value" :selected="tab.current">
          {{ tab.title }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8" aria-label="Tabs">
          <router-link
            :to="{
              name: 'production',
              query: { type: 0 }
            }"
            :class="[
              route.query?.type == 0 || !route.query?.type
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-[1px] py-4 px-1 text-sm font-medium'
            ]"
            >Все товары
          </router-link>
          <router-link
            :to="{
              name: 'production',
              query: { type: tab.value }
            }"
            v-for="tab in productStatusList2.filter((p) => p.value > 0)"
            :key="tab.name"
            :class="[
              route.query?.type == tab.value || (!route.query?.type && tab.value == 0)
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-[1px] py-4 px-1 text-sm font-medium'
            ]"
            :aria-current="tab.current ? 'page' : undefined"
            >{{ tab.title }}
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
import { productStatusList2 } from '@/types/production/product'
</script>
<style lang=""></style>
