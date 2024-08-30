<template>
  <head-part title="Рабочий график" />
  <div class="p-6 pb-0 flex flex-col overflow-hidden">
    <div class="flex gap-2">
      <div class="flex-1">
        <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            autocomplete="off"
            class="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="flex-1">
        <la-select label="Должность" placeholder />
      </div>
      <div class="flex-1">
        <la-select label="Отдел" />
      </div>
    </div>
  </div>
  <workTable />
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import workTable from '@/components/user/workTable.vue'
</script>
<style lang=""></style>
