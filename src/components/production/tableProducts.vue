<template>
  <div class="mt-6 flex-1 flex flex-col">
    <div class="flex-1 flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <!-- <pre>     {{ store.products }}</pre> -->
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
                  >
                    Товар
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    Тип
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    еДИНИЦА ИЗМЕРЕНИЯ
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
                  >
                    Кол-во / сумма
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only"> </span>
                  </th>
                </tr>
              </thead>
<!--              <pre>{{store.universalStateForProduct}}</pre>-->
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="product in store.universalStateForProduct"
                  :key="product.id"
                  @click="toRoute({ name: 'showproduct_warehouse', params: { id: product.id } })"
                  class="hover:cursor-pointer"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    <div class="flex justify-start items-center flex-grow gap-3">
                      <img
                        :src="`${product.photo ? url + '/' + product.photo : nophoto}`"
                        class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-10 h-10 rounded-[144px] bg-[url(&#x27;text.png&#x27;)] bg-cover bg-no-repeat bg-center"
                      />
                      <div class="flex flex-col justify-start items-start flex-grow relative">
                        <p
                          class="self-stretch flex-grow-0 flex-shrink-0 w-[177.5px] text-sm font-medium text-left text-gray-900"
                        >
                          {{ product.name }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      v-if="route.query.type == 0"
                      :class="`px-2.5 py-0.5 rounded-[10px] flex-grow-0 flex-shrink-0 text-xs font-medium text-center  ${productStatusList[product?.type || 0]?.class}`"
                    >
                      {{
                        product.type == 'container'
                          ? 'Тары'
                          : product.type == 'part'
                            ? 'Детали'
                            : 'Продукты'
                      }}
                    </span>

                    <span v-else>
                      {{ productStatusList2[route.query.type].title }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ productUnitList[product.unit - 1 || 0]?.title }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="font-medium text-black">
                      {{ product.total_sum?.toLocaleString() || 0 }} сум
                    </div>
                    <div class="text-gray-400">
                      {{ product.total_quantity?.toLocaleString() || 0 }}
                      {{ productUnitList[product.unit - 1 || 0]?.title }}
                    </div>
                  </td>

                  <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium">
                    <div href="#" class="text-indigo-600 hover:text-indigo-900">
                      <ChevronRightIcon class="size-6 text-gray-400" />
                    </div>
                  </td>
                </tr>

                <tr
                  v-if="store.universalStateForProduct && store.universalStateForProduct.length === 0"
                >
                  <td colspan="5" class="text-center p-3">
                    <span class="text-sm">Нет данных</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
<!--          {{ store.universalStateForProductPagination.total_count }}-->
          <paginate
            v-if="store.universalStateForProductPagination.total_count && !route.query.type == 0"
            class="mt-4"
            :page-count="store.universalStateForProductPagination.total_pages"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :container-class="'pagination_next shadow'"
            :page-class="'page-item'"
            :prev-text="'<'"
            :next-text="'>'"
            :prev-class="'pagination-button'"
            :next-class="'pagination-button'"
            :active-class="'active'"
            :disabled-class="'disabled'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  type Product,
  productUnitList,
  productStatusList,
  productStatusList2
} from '@/types/production/product'
import nophoto from '@/assets/nophoto.png'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
const url = import.meta.env.VITE_URL
import { productStore } from '@/stores/production/product'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const store = productStore()
const { products, products_count } = storeToRefs(store)

import { type Params, type toRouteType } from '@/types/api'
const router = useRouter()
const route = useRoute()

const params = ref({
  limit: 10,
  name: null
})

const toRoute = (obj: toRouteType) => {
  router.push(obj)
}

const clickCallback = async (e: any) => {
  let page = e
  if (route.query.type == 1) {
    await store.getAllContainers({ ...params.value, page })
  }

  if (route.query.type == 2) {
    await store.getAllProducts({ ...params.value, page })
  }

  if (route.query.type == 3) {
    await store.getParts({ ...params.value, page })
  }
}

const getData = async () => {
  await store.getAllProducts({ ...params.value })
}

watch(
  () => route.query,
  async () => {
    if (route.query.type == 0) {
      await store.getAllProducts2()
    }

    if (route.query.type == 1) {
      await store.getAllContainers(params.value)
    }

    if (route.query.type == 2) {
      getData()
    }

    if (route.query.type == 3) {
      await store.getParts(params.value)
    }
  }
)

onMounted(async () => {
  if (route.query.type == 1) {
    await store.getAllContainers(params.value)
  } else if (route.query.type == 2) {
    getData()
  } else if (route.query.type == 3) {
    await store.getParts(params.value)
  } else {
    await store.getAllProducts2()
  }
})
</script>
<style lang=""></style>
