<template lang="">
  <div class="mb-6">
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <router-link
            :to="{
              name: 'employee',
              query: { status: tab.value }
            }"
            v-for="tab in statusList"
            :key="tab.name"
            :class="[
              route.query?.status == tab.value || (!route.query?.status && tab.value == 0)
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { type Status } from '@/types/helper'

const route = useRoute()
const statusList = ref<Status[]>([
  {
    title: 'Весь персонал',
    value: 0,
    current: true
  },
  {
    title: 'Включённые',
    value: 1,
    current: false
  },
  {
    title: 'Выключенные',
    value: 2,
    current: false
  }
])
</script>
<style lang=""></style>
