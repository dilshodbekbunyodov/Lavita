<template>
  <head-part title="Создание накладной" backLink="invoices" />
  <div class="px-6 py-3.5 flex-1 flex flex-col overflow-auto">
    <div class="max-w-md">
      <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl" @submit.prevent>
        <div class="p-4 text-base font-semibold border-b-[1px] border-gray-100">Информация</div>
        <div class="p-4">
          <div class="flex gap-4 mb-4">
            <div class="flex-1">
              <la-input
                v-model="data.number"
                name="name"
                label="Номер накладной"
                :maska="'##################'"
                placeholder="Введите номер"
                :error="v$.number.$invalid && v$.number.$dirty"
              />
              <span v-if="v$.number.$invalid && v$.number.$dirty">
                <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
              </span>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Выберите склад</label
              >
              <select
                v-model="data.warehouse"
                placeholder="Выберите значение"
                class="block w-full rounded-md border-0 py-2 mt-2 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>Выберите значение</option>
                <option v-for="(item, index) in warehouses" :key="index" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <!-- <la-select
                v-model="data.warehouse"
                label="Выберите склад"
                :list="warehouses"
                name="name"
                :error="v$.warehouse.$invalid && v$.warehouse.$dirty"
              /> -->
              <span v-if="v$.warehouse.$invalid && v$.warehouse.$dirty">
                <p class="mt-2 text-xs text-red-600" id="email-error">Выберите из списка</p>
              </span>
            </div>
          </div>

          <!-- <div class="mb-4">
            <la-users v-model="data.employee" label="Поставщик" placeholder="Выберите поставщика" />
            :error="v$.employee.$invalid && v$.employee.$dirty"
            <span v-if="v$.employee.$invalid && v$.employee.$dirty">
              <p class="mt-2 text-xs text-red-600" id="email-error">Выберите поставщика</p>
            </span>
          </div> -->

          <div>
            <label for="file-upload" class="block mb-2">Дополнительный файл</label>
            <div v-for="(file, index) in files" :key="index" class="mb-4 flex items-center">
              <img :src="file.url" alt="file preview" class="w-12 h-12 object-cover mr-4" />
              <span class="text-gray-700 mr-4">{{ file.name }}</span>
              <button @click="removeFile(index)" class="text-red-600 hover:underline">
                Удалить товар
              </button>
            </div>
            <input id="file-upload" type="file" class="hidden" @change="handleFileUpload" />
            <button
              @click="triggerFileInput"
              class="mt-2 p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              + Добавить ещё
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="flex mt-6 gap-6 pt-6 border-t-2 border-gray-200">
      <detailProduct @add="handleAdd" :count="true" />
      <div class="flex-1">
        <addProduct v-model="data.invoicepacks" @save="save" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import detailProduct from '@/components/invoice/detailProductInvoice.vue'
import addProduct from '@/components/invoice/addProductInvoice.vue'
import { type setInvoice } from '../../../types/invoice/invoice'
import { type ProductPack } from '@/types/production/productpack'
import { useRoute, useRouter } from 'vue-router'

import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import type { Detail } from '@/types/production/product'
import { useNotification } from '@/stores/usefull/notification'

import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const route = useRoute()
const router = useRouter()

const notification = useNotification()
const user_store = userStore()
const { users } = storeToRefs(user_store)

const model = defineModel()
const files = ref([])
const realFiles = ref([])

const triggerFileInput = () => {
  document.getElementById('file-upload').click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    realFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      files.value.push({
        name: file.name,
        url: e.target.result
      })
    }
    reader.readAsDataURL(file)
  }
}

const removeFile = (index) => {
  files.value.splice(index, 1)
  realFiles.value.splice(index, 1)
}

const data = ref<setInvoice>({
  number: '',
  warehouse: '',
  employee: '',
  invoicepacks: []
})

const rules = {
  number: { required },
  // employee: { required },
  warehouse: { required }
}

const v$ = useVuelidate(rules, data)

import { warehouseStore } from '@/stores/warehouse/warehouse'
const warehouse_store = warehouseStore()
const { warehouses } = storeToRefs(warehouse_store)

import { invoiceStore } from '@/stores/invoice/invoice'
const store = invoiceStore()

const save = async (status: number) => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    let container = data.value.invoicepacks.filter((item) => item.type == 'container')
    let part = data.value.invoicepacks.filter((item) => item.type == 'part')

    let newData = {
      number: data.value.number,
      warehouse_receiver_id: data.value.warehouse,
      container_lots: container.map((item) => {
        return {
          quantity: item.count,
          price: item.price,
          container_id: item.id
        }
      }),
      part_lots: part.map((item) => {
        return {
          quantity: item.count,
          price: item.price,
          part_id: item.id
        }
      })
    }

    const res = await store.addInvoice(newData)
    console.log(res)

    const formData = new FormData()

    if (res.data.id && realFiles.length) {
      console.log('hefd')

      for (let i = 0; i < realFiles.length; i++) {
        formData.append('files[]', realFiles.value[i])
      }

      await store.updateFileInvoice({ id: res.data.id, files: formData })

      await router.push({ name: 'invoices' })
    } else {
      await router.push({ name: 'invoices' })
    }
  }
}

type Product = {
  _id: string
  productinvoice?: string
  title: string
  count: number
  maxcount?: number
}

import { codeStore } from '@/stores/production/code'
const code_store = codeStore()
const handleAdd = async (product: Product) => {
  console.log(product)

  data.value.invoicepacks?.push({
    id: product.id,
    title: product.name,
    count: 0,
    price: 0,
    type: product.type
  })
  // } else {
  //   notification.setNotif(true, 'У продукта нету количество прозводственного накладной', 'warning')
  // }
}

watch(
  () => data.value,
  () => {
    model.value = { ...data.value }
  }
)

onMounted(async () => {
  await user_store.getAllUsers({
    limit: 0
  })
  await warehouse_store.getAllWarehouses({
    limit: 500
  })
})
</script>
