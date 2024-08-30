<template>
  <div class="flex flex-col justify-start items-start flex-grow gap-4">
    <div
      class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-sm"
    >
      <div
        class="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 relative px-4 py-3.5 border-t-0 border-r-0 border-b border-l-0 border-gray-200"
      >
        <div class="text-base font-semibold text-left text-gray-900">
          Списание
          <div class="text-gray-400 font-normal">
            Итого
            <span class="text-gray-900">0 шт.</span>
          </div>
        </div>
        <nav class="flex space-x-1 bg-gray-200 p-0.5 rounded-md" aria-label="Tabs">
          <button
            type="button"
            v-for="tab in productStatusList"
            :key="tab.title"
            @click="setCurrent(tab.value)"
            :class="[
              tab.value == selected
                ? 'bg-white text-gray-900'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            ]"
            :aria-current="tab.value == selected ? 'page' : undefined"
          >
            {{ tab.title }}
          </button>
        </nav>
        <!-- {{ props.warehouse }} -->
        <!-- {{ model[selected] }} -->
      </div>
      <div
        v-if="model && Object.keys(model).length"
        class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0"
      >
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
              >
                название
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
              >
                Количество
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
              ></th>
              <th scope="col" class="relative py-3.5 max-w-14"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-if="model[selected] && model[selected].length"
              v-for="(product, index) in model[selected]"
              :key="index"
            >
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
              >
                <div class="flex justify-start items-center flex-grow gap-3">
                  <input
                    v-if="selected == 'products'"
                    id="default-checkbox"
                    type="checkbox"
                    v-model="product.checked"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
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
                <div class="text-gray-900 sm:text-sm sm:leading-6">
                  <la-input
                    v-if="selected === 'containers' || selected === 'parts'"
                    v-model="product.count"
                    name="name"
                    placeholder="Введите номер"
                  />
                  <div v-else>{{ product.count }} шт.</div>
                </div>
              </td>

              <td
                v-if="selected !== 'containers' && selected !== 'parts'"
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
              >
                <button
                  @click="openScan(product, index)"
                  class="px-4 min-w-[169] py-2 bg-blue-100 rounded justify-center items-center gap-2 flex"
                >
                  <div class="w-5 h-5 relative">
                    <img src="@/assets/icons/qrcode.svg?url" alt="" />
                  </div>
                  <div
                    class="text-blue-700 text-sm min-w-[107px] font-medium font-['Inter'] leading-tight"
                  >
                    Список ({{ nonEmptyCodesLength(product) }}/{{ product.count }})
                    <!--                                        Список ({{ product.codes?.length || 0 }}/{{ product.count }})-->
                    <!--                                      {{nonEmptyCodesLength(product)}}-->
                  </div>
                </button>
              </td>

              <td class="relative whitespace-nowrap py-4 px-4 text-sm font-medium">
                <button @click="confirmRemove(index)" class="text-indigo-600 hover:text-indigo-900">
                  <XMarkIcon class="size-6 text-gray-400" />
                </button>
              </td>
            </tr>

            <tr v-else>
              <td colspan="6" class="text-center p-3">
                <span class="text-sm">Нет данных</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex p-4 border-t-2 border-gray-200 gap-2 w-full">
          <button
            type="submit"
            @click="save(2)"
            :disabled="model[selected].length == 0"
            class="rounded-md flex-1 bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Сохранить как черновик
          </button>
          <button
            type="submit"
            @click="save(1)"
            :disabled="model[selected].length == 0"
            class="rounded-md flex-1 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Сохранить и опубликовать
          </button>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4 p-4"
      >
        <div
          class="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3 p-4 rounded-md bg-blue-50"
        >
          <img src="@/assets/icons/information-circle.svg?url" alt="" />
          <div class="flex flex-col justify-start items-start flex-grow gap-2.5">
            <div
              class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2"
            >
              <div
                class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative"
              >
                <p class="flex-grow w-[542px] text-sm font-medium text-left text-blue-800">
                  Выберите, товар из слева используя поиск
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <scan-product v-model="product" @update="handleUpdate" />
  <dialogModal
    btnTitle="Убрать товар"
    title="Вы точно хотите удалить продукт из накладной?"
    :dialog="toggle"
    @answer="remove"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import type { ProductPack } from '@/types/production/productpack'
import { expenseStore } from '@/stores/expense/expense'
const props = defineProps(['warehouse'])
const model = defineModel()
import scanProduct from '@/components/expense/scanProduct.vue'
const product = ref<ProductPack>({
  count: 0,
  product: '',
  productinvoice: '',
  title: '',
  codes: []
})
const indexProduct = ref<number>(0)

const store = movementStore()
const store2 = expenseStore()
// const props = defineProps(['model'])
// const model = ref({})

const productStatusList = ref([
  {
    title: 'Продукты',
    value: 'products',
    current: false
  },
  {
    title: 'Тары',
    value: 'containers',
    current: false
  },
  {
    title: 'Детали',
    value: 'parts',
    current: false
  }
])

const selected = ref<string>('products')
const setCurrent = (value: number) => {
  console.log(value, 'dsa')
  selected.value = value
}

import { useFullStore } from '@/stores/usefull/modal'
const usefullStore = useFullStore()
const handleUpdate = (codes: any) => {
  if (model.value[selected.value]) {
    model.value[selected.value][indexProduct.value].codes = codes
    // model.value[indexProduct.value].codes = codes
  }
}

const openScan = async (p: ProductPack, index: number) => {
  console.log(p)
  await store2.getMarkupById({ product_id: p.id, warehouse_id: props.warehouse })

  //   if (p.count < 1) {
  //     return false
  //   }
  product.value = { ...p }
  indexProduct.value = index
  //   if (product.value.codes?.length !== product.value.count) {
  //     console.log('kirdi')

  //     product.value.codes = product.value.codes?.concat(
  //       Array.from({ length: product.value.count - product.value.codes.length }, () => '')
  //     )
  //   }
  //   product.value.codes
  //   if (store.transferList) {
  //     model.value[selected.value][indexProduct.value] = product.value
  //   }
  product.value.codes = store2.markups
  usefullStore.setToggle(true)
}

// model.value = store.transferList
import dialogModal from '../default/dialogModal.vue'
import { movementStore } from '@/stores/invoice/movement'
const id = ref<number>(0)
const toggle = ref<boolean>(false)
const confirmRemove = (_id: number) => {
  id.value = _id
  toggle.value = true
}
const remove = (answer: boolean) => {
  if (answer) {
    model.value[selected.value]?.splice(id.value, 1)
  }
  close()
}
const close = () => {
  toggle.value = false
  id.value = 0
}

const emit = defineEmits(['save'])
const save = (status: number) => {
  // let check = model.value?.every((product) => product.count > 0 && product.price)

  // if (!check) {
  //     notification.setNotif(true, 'Заполните данные о накладного', 'warning')
  // }

  emit('save', status)
}

const nonEmptyCodesLength = (e: any) => {
  return e.codes?.filter((code: string) => code.trim() !== '').length || 0
}
</script>
