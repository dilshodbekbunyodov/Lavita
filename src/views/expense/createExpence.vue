<template>
  <head-part title="Создать списания" backLink="expense" />

  <div class="px-6 py-3.5 flex-1 flex flex-col overflow-auto">
    <div class="max-w-md">
      <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl" @submit.prevent>
        <div class="p-4 text-base font-semibold border-b-[1px] border-gray-100">Информация</div>
        <!-- {{ data.codes }} -->
        <div class="p-4">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex-1">
              <la-input
                v-model="data.number"
                name="name"
                label="Номер документа"
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
                v-model="data.warehouse_sender_id"
                class="block w-full rounded-md border-0 py-2 mt-2 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
              >
                <option v-for="(item, index) in warehouses" :key="index" :value="item.id">
                  {{ item.name }}
                </option>
              </select>

              <span v-if="v$.warehouse_sender_id.$invalid && v$.warehouse_sender_id.$dirty">
                <p class="mt-2 text-xs text-red-600" id="email-error">Выберите из списка</p>
              </span>
            </div>
          </div>

          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >Дополнительный файл</label
          >
          <label
            v-if="!imageUrl"
            type="button"
            label="photo"
            for="photo"
            class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2"
          >
            <input style="display: none" id="photo" type="file" @change="handleFileUpload" />
            <div
              class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 p-2 rounded bg-blue-100"
            >
              <img :src="plusFile" alt="" />
            </div>
            <div class="flex flex-col justify-center items-start flex-grow relative">
              <p
                class="self-stretch flex-grow-0 flex-shrink-0 w-[344px] text-sm text-left text-gray-900"
              >
                Выберите файл
              </p>
              <p
                class="self-stretch flex-grow-0 flex-shrink-0 w-[344px] text-xs text-left text-gray-400"
              >
                PDF, .exc, jpeg, jpg, png, doc, docx
              </p>
            </div>
          </label>

          <div class="flex items-center mt-2" v-if="imageUrl">
            <img class="h-[36px] w-[36px] object-cover" :src="imageUrl" alt="" />
            <div class="ml-2">
              <div class="text-sm">{{ fileName1 }}</div>
              <div class="text-[#DC2626] text-xs cursor-pointer" @click="imageUrl = ''">
                Удалить товар
              </div>
            </div>
          </div>

          <!-- <label v-if="!imageUrl" type="button" label="photo" for="photo"
                 class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2">
            <input style="display: none" id="photo" type="file" @change="handleFileUpload">
            <div
              class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 p-2 rounded bg-blue-100">
              <img :src="plusFile" alt="">
            </div>
            <div class="flex flex-col justify-center items-start flex-grow relative">
              <p class="self-stretch flex-grow-0 flex-shrink-0 w-[344px] text-sm text-left text-gray-900">
                Выберите файл
              </p>
              <p class="self-stretch flex-grow-0 flex-shrink-0 w-[344px] text-xs text-left text-gray-400">
                PDF, .exc, jpeg, jpg, png, doc, docx
              </p>
            </div>
          </label>

          <div class="flex items-center mt-2" v-if="imageUrl">
            <img class="h-[36px] w-[36px] object-cover " :src="imageUrl" alt="" />
            <div class="ml-2">
              <div class="text-sm">{{ fileName1 }}</div>
              <div class="text-[#DC2626] text-xs cursor-pointer" @click="imageUrl = ''">Удалить товар</div>
            </div>
          </div> -->
          <!-- 
          <label class="inline-flex items-center cursor-pointer mt-4">
            <input type="checkbox" value="" class="sr-only peer" />
            <div
              class="bg-gray-200 relative w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span class="ms-3 text-sm font-medium !text-black dark:text-gray-300"
              >Возвращать сумму деталей</span
            >
          </label> -->
        </div>
      </form>
    </div>
    <!--    <pre>{{ store.transferList }}</pre>-->
    <div class="flex mt-6 gap-6 pt-6 border-t-2 border-gray-200">
      <detailProduct @add="handleAddPro" :warehouse="data.warehouse_sender_id" :count="true" />

      <div class="flex-1">
        <addProduct @save="save" v-model="data.codes" :warehouse="data.warehouse_sender_id" />
        <!--        :model="store.transferList"-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import detailProduct from '@/components/expense/detailExpense.vue'
import addProduct from '@/components/expense/addProductExpense.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { warehouseStore } from '@/stores/warehouse/warehouse'
import { expenseStore } from '@/stores/expense/expense'
import plusFile from '@/assets/plusFile.svg?url'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const model = defineModel()
const files = ref([])
const realFiles = ref([])
const rules = {
  number: { required },
  warehouse_sender_id: { required }
}
const store = expenseStore()

const data = ref({
  number: '',
  warehouse_sender_id: '',
  codes: {
    products: [],
    parts: [],
    containers: []
  }
})
let imageUrl = ref<any>('')
const fileName1 = ref('')
const userData = ref({
  photo: ''
})

const v$ = useVuelidate(rules, data)
const warehouse_store = warehouseStore()
const { warehouses } = storeToRefs(warehouse_store)

watch(
  () => data.value,
  () => {
    model.value = { ...data.value }
  }
)

watch(
  () => data.value.warehouse_sender_id,
  async () => {
    await store.getWarehouseById(data.value.warehouse_sender_id)
  }
)

onMounted(async () => {
  await warehouse_store.getAllWarehouses({
    limit: 50
  })
})
// const save = async () => {
//   v$.value.$touch()
//   console.log(data.value, 'assa')
//
//   if (!v$.value.$invalid) {
//     // await store.addMovement({ ...data.value, status })
//     // await store.createTransfer({
//     //   number: data.value.number,
//     //   warehouse_sender_id: data.value.from_warehouse,
//     //   warehouse_receiver_id: data.value.to_warehouse
//     // })
//
//     const reformatCode = {
//
//     }
//   }
// }

const save = async () => {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    const reformatCode = {
      product_unit_markups: data.value.codes.products.flatMap((item) => {
        return item.codes.map((code) => {
          return {
            markup: code,
            with_container: item.checked
          }
        })
      }),
      container_ids: data.value.codes.containers.map((item) => {
        return {
          container_id: item.id,
          quantity: Number(item.count)
        }
      }),
      part_ids: data.value.codes.parts.map((item) => {
        return {
          part_id: item.id,
          quantity: Number(item.count)
        }
      }),
      number: data.value.number,
      warehouse_sender_id: data.value.warehouse_sender_id,
      additionalProp1: {}
    }

    console.log(reformatCode, 'reformatCode')

    const res = await store.addExpense(reformatCode)
    console.log(res, 'outside')
    if (imageUrl.value) {
      const formData = new FormData()
      formData.append('files', userData.value.photo)

      await store.addFileExpense({ id: res.data.id, files: formData })

      await router.push({ name: 'expense' })
    } else {
      await router.push({ name: 'expense' })
    }
  }
}

const removeFile = (index) => {
  files.value.splice(index, 1)
  realFiles.value.splice(index, 1)
}

const handleAddPro = (product: any, selected: string) => {
  data.value.codes[selected].push({
    ...product,
    checked: false
  })
}

const triggerFileInput = () => {
  document.getElementById('file-upload').click()
}

const handleFileUpload = (event: any) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  fileName1.value = file.name

  reader.onload = (event: any) => {
    imageUrl.value = event.target.result
    userData.value.photo = file
  }
  reader.readAsDataURL(file)
}
</script>
