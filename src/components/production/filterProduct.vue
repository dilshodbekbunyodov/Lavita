<template>
  <div class="flex gap-2">
    <div class="basis-3/6">
      <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          autocomplete="off"
          v-model="search.title"
          @input="findProduct"
          class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { watchDebounced } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { productStore } from '@/stores/production/product'
const store = productStore()

const route = useRoute()

type Search = {
  title: string
}
const search = ref<Search>({
  title: ''
})

watchDebounced(
  () => search.value.title,
  async function () {
    if (search.value.title) {
      let name = search.value.title
      if (route.query.type == 1) {
        await store.getAllContainers({
          limit: 10,
          page: 1,
          name
        })
      }

      if (route.query.type == 2) {
        await store.getAllProducts({ limit: 10, page: 1, name })
      }

      if (route.query.type == 3) {
        await store.getParts({ limit: 10, page: 1, name })
      }
    } else {
      if (route.query.type == 1) {
        await store.getAllContainers({
          limit: 10,
          page: 1
        })
      }

      if (route.query.type == 2) {
        await store.getAllProducts({ limit: 10, page: 1 })
      }

      if (route.query.type == 3) {
        await store.getParts({ limit: 10, page: 1 })
      }
    }
  },
  { deep: true, debounce: 500, maxWait: 5000 }
)

const findProduct = async () => {}
</script>
<style lang=""></style>
