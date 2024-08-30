<template>
  <head-part
    title="Создание прозводственного накладной"
    backLink="proinvoice"
  />

  <div class="px-6 py-3.5 flex-1 flex flex-col overflow-auto">
    <div class="max-w-md">
      <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl" @submit.prevent>
        <div class="p-4 text-base font-semibold border-b-[1px] border-gray-100">Информация</div>
        <div class="p-4 w-[100%]">
          <div class="flex gap-4">
            <div class="w-[50%] flex-1">
              <la-input
                v-model="data.number"
                name="name"
                label="Номер накладной"
                :maska="'##################'"
                placeholder="Введите номер"
              />
              <div v-if="error?.number">
                <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
              </div>
            </div>

            <div class="w-[50%]">
              <label class="block text-sm font-medium leading-6 text-gray-900">Выберите склад</label>
              <select v-model="data.warehouse"
                      class="block w-full rounded-md border-0 py-2 mt-2 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6">
                <option v-for="(item, index) in warehouses" :key="index" :value="item.id">{{ item.name }}</option>
              </select>

              <div v-if="error?.warehouse">
                <p class="mt-2 text-xs text-red-600" id="email-error">Выберите из списка</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="flex mt-6 gap-6 pt-6 border-t-2 border-gray-200">
      <detailProduct
        @add="handleAdd"
        @getInvoiceType="getInvoiceType"
      />

      <div class="flex-1">
        <addProduct
          v-model="data.productpacks"
          @save="save"
          @saveGreenBtn="saveGreenBtn"
          :productType="productType"
          :filterList="store.filterList"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import detailProduct from '@/components/invoice/detailProductProInvoice.vue'
import addProduct from '@/components/invoice/addProductProInvoice.vue'
import { type ProInvoice } from '@/types/production/proInvoice'
import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { warehouseStore } from '@/stores/warehouse/warehouse'
import { proInvoiceStore } from '@/stores/invoice/proInvoice'

const model = defineModel()
type Error = {
  number?: boolean
  warehouse?: boolean
}

type Product = {
  _id: string
  productinvoice?: string
  title: string
  count: number
}

const error = ref<Error>({
  number: false,
  warehouse: false
})
const data = ref<ProInvoice>({
  number: '',
  warehouse: '',
  productpacks: []
})
const productType = ref('products')

const user_store = userStore()
const warehouse_store = warehouseStore()
const { warehouses } = storeToRefs(warehouse_store)
const store = proInvoiceStore()

const save = async () => {
  if (!data.value.number) {
    error.value.number = true
    return false
  }
  if (!data.value.warehouse) {
    error.value.warehouse = true
    return false
  }

  const reformattedData = {
    product_lots: data.value.productpacks.map(pack => ({
      markups: pack.codes,
      quantity: parseInt(pack.codes?.length),
      product_id: pack.product_id
    })),
    number: data.value.number,
    warehouse_receiver_id: data.value.warehouse
  }

  const containerLots = {
    container_lots: data.value.productpacks?.map((e) => ({
      const_quantity: Number(e.count),
      quantity: Number(e.count),
      price: Number(e.price),
      container_id: e.product_id
    }))
  }

  await store.addProInvoice({ ...reformattedData, ...containerLots })
}

// const save = async () => {
//   if (!data.value.number) {
//     error.value.number = true;
//     return false;
//   }
//   if (!data.value.warehouse) {
//     error.value.warehouse = true;
//     return false;
//   }
//
//   let reformattedData = {
//     number: data.value.number,
//     warehouse_receiver_id: data.value.warehouse,
//   };
//
//   if (data.value.type === 'products') {
//     reformattedData.product_lots = data.value.productpacks.map(pack => ({
//       markups: pack.codes,
//       quantity: parseInt(pack.codes?.length),
//       product_id: pack.product_id,
//     }));
//   } else if (data.value.type === 'containers') {
//     reformattedData.container_lots = data.value.productpacks.map(pack => ({
//       const_quantity: Number(pack.count),
//       quantity: Number(pack.count),
//       price: Number(pack.price),
//       container_id: pack.product_id,
//     }));
//   }
//
//   await store.addProInvoice(reformattedData);
// };


const saveGreenBtn = () => {
  console.log('hali chizilmagan ekan gruppada chizip beramiz diyishdi ushanchun bom bush')
}

const handleAdd = (product: Product) => {
  data.value.productpacks?.push({
    type: product.type,
    price: product.total_sum,
    productinvoice: product.name,
    product_id: product.id,
    title: product.title,
    count: 0,
    codes: []
  })

  store.getFilterList({
    product_id: product.id,
    limit: 500
  })

  console.log(store.filterList, 'filterList')
}

const getInvoiceType = (type: any) => {
  console.log(type, 'type')
  productType.value = type
}

watch(() => data.value, () => {
  model.value = { ...data.value }
})

onMounted(async () => {
  // await store.getFilterList({
  //   limit: 500
  // })

  await warehouse_store.getAllWarehouses({
    limit: 50
  })

  await user_store.getAllUsers({
    limit: 50
  })
})
</script>
