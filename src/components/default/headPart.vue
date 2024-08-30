<template>
  <header class="flex justify-between items-center bg-white px-6 py-3.5 border-b-gray-200 border-b-[1px]">
    <div class="flex items-center">
      <router-link :to="{ name: backLink }" v-if="backLink">
        <ChevronLeftIcon class="size-6 text-gray-400 mr-2" />
      </router-link>
      <div class="text-2xl font-semibold">
        <span v-if="grayTitle" class="text-gray-500">{{ grayTitle }}</span>
        {{ title }}
      </div>
    </div>

    <div class="flex gap-2">
      <button v-if="toggle" @click="openModal"
        class="py-3 px-3 rounded-lg leading-4 bg-blue-600 text-base hover:bg-blue-700 text-white flex items-center">
        <span v-html="plus" class="px-2 flex" />
        {{ toggleTitle || 'Добавить' }}
      </button>
      <button v-if="downloadLink" @click="generateExcel(downloadLink)"
        class="py-3 px-3 white-invert rounded-lg leading-4 text-base hover:bg-blue-700 hover:text-white text-gray-900 ring-1 ring-gray-300 flex items-center ">
        <img src="@/assets/download.svg?url" class="px-2 flex" />
        Скачать файл
      </button>
      <router-link v-if="addLink" :to="{ name: addLink }"
        class="py-3 px-3.5 rounded-lg leading-4 bg-blue-600 text-base hover:bg-blue-700 text-white flex items-center">
        <span v-html="plus" class="px-2 flex" />
        {{ addLinkTitle || 'Добавить' }}
      </router-link>
      <slot />
    </div>
  </header>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  toggleTitle: String,
  addLink: String,
  addLinkTitle: String,
  toggle: Boolean,
  backLink: String,
  downloadLink: String,
  grayTitle: String
})
const url = import.meta.env.VITE_URL
import plus from '@/assets/plus.svg?raw'
import down from '@/assets/download.svg?raw'

import { useFullStore } from '@/stores/usefull/modal'
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
const store = useFullStore()

const openModal = () => {
  store.setToggle(true)
}

import { generateExcel } from '@/helpers/func'
</script>
<style lang="scss" scoped>
header {
  height: 62px;
}
</style>
