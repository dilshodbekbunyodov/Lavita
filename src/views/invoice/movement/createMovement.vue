<template>
  <head-part
    title="Создать перемещения"
    backLink="movements"
  />

  <div class="px-6 py-3.5 flex-1 flex flex-col overflow-auto">
    <div class="max-w-md">
      <form
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        @submit.prevent
      >
        <div class="p-4 text-base font-semibold border-b-[1px] border-gray-100">Информация</div>

        <div class="p-4">
          <div class="flex flex-col gap-4 mb-4">
            <div class="flex-1">
              <la-input v-model="data.number" name="name" label="Номер накладной" :maska="'##################'"
                        placeholder="Введите номер" :error="v$.number.$invalid && v$.number.$dirty" />
              <span v-if="v$.number.$invalid && v$.number.$dirty">
                <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
              </span>
            </div>

            <div class="flex-1">
              <label for="name1" class="block text-sm font-medium leading-6 text-gray-900">Склад откуда забрать</label>
              <select id="name1" :disabled="!data.number" v-model="data.from_warehouse"
                      :class="!data.number ? '!bg-[#1118270f]' : ''"
                      class="block w-full rounded-md border-0 py-2 mt-2 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6">
                <option v-for="(item, index) in warehouses" :key="index" :value="item.id">{{ item.name }}</option>
              </select>

              <span v-if="v$.from_warehouse.$invalid && v$.from_warehouse.$dirty">
                <p class="mt-2 text-xs text-red-600" id="email-error">Выберите из списка</p>
              </span>
            </div>

            <div class="flex-1">
              <label for="name2" class="block text-sm font-medium leading-6 text-gray-900">Склад куда забрать</label>
              <select id="2" :disabled="!data.from_warehouse" v-model="data.to_warehouse"
                      :class="!data.from_warehouse ? '!bg-[#1118270f]' : ''"
                      class="block w-full rounded-md border-0 py-2 mt-2 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6">
                <option v-for="(item, index) in warehouses" :key="index" :value="item.id">{{ item.name }}</option>
              </select>

              <span v-if="v$.to_warehouse.$invalid && v$.to_warehouse.$dirty">
                <p class="mt-2 text-xs text-red-600" id="email-error">Выберите из списка</p>
              </span>
            </div>
          </div>

          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2">Дополнительный файл</label>
          <label v-if="!imageUrl" type="button" label="photo" for="photo"
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
          </div>
        </div>
      </form>
    </div>

    <div class="flex mt-6 gap-6 pt-6 border-t-2 border-gray-200">
      <!--        :warehouse="data.to_warehouse"-->
      <detailProduct
        @add="handleAddPro"
        :warehouse="data.from_warehouse"
        :count="true"
      />


      <div class="flex-1">
        <addProduct
          @save="save"
          @getMarkups="getMarkups"
          :warehouseId="data.from_warehouse"
        />
      </div>
    </div>

<!--    <pre>{{store.transferList}}</pre>-->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import detailProduct from '@/components/invoice/detailMovement.vue'
import addProduct from '@/components/invoice/addProductMovement.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { warehouseStore } from '@/stores/warehouse/warehouse'
import { movementStore } from '@/stores/invoice/movement'
import plusFile from '@/assets/plusFile.svg?url'

const model = defineModel()
const rules = {
  number: { required },
  employee: { required },
  to_warehouse: { required },
  from_warehouse: { required }
}
const store = movementStore()

const data = ref({
  number: '',
  to_warehouse: '',
  from_warehouse: '',
  employee: '',
  codes: []
})
let imageUrl = ref<any>('')
const fileName1 = ref('')
const userData = ref({
  photo: ''
})

const v$ = useVuelidate(rules, data)
const warehouse_store = warehouseStore()
const { warehouses } = storeToRefs(warehouse_store)

watch(() => data.value, () => {
  model.value = { ...data.value }
})

store.transferList = {
  product_unit_markups: [],
  container_ids: [],
  part_ids: []
}

onMounted(async () => {
  await warehouse_store.getAllWarehouses({
    limit: 50
  })
})

// const save = async () => {
//   v$.value.$touch()
//
//   // if (!v$.value.$invalid) {
//   const reformatCode = {
//     // product_unit_markups: store.transferList.product_unit_markups.flatMap(item => item.codes),
//     product_unit_markups: store.transferList.product_unit_markups.flatMap(item => item.codes.filter(code => code.checked && code.id).map(code => code.id)).filter((value, index, self) => self.indexOf(value) === index),
//     container_ids: store.transferList.container_ids.map(item => ({
//       container_id: item.id,
//       quantity: Number(item.count)
//     })),
//     part_ids: store.transferList.part_ids.map(item => ({
//       part_id: item.id,
//       quantity: Number(item.count)
//     })),
//     number: data.value.number,
//     warehouse_sender_id: data.value.from_warehouse,
//     warehouse_receiver_id: data.value.to_warehouse
//   }
//
//   await store.createTransfer(reformatCode)
//     .then((res) => {
//       if (imageUrl.value) {
//         const formData = new FormData()
//         formData.append('files', userData.value.photo)
//
//         store.updatePhotoTransfer({
//           data: formData,
//           id: res.id
//         })
//       }
//     })
// }

const save = async () => {
  v$.value.$touch()

  // if (!v$.value.$invalid) {
    const reformatCode = {
      product_unit_markups: store.transferList.product_unit_markups.flatMap(item => item.codes),
      container_ids: store.transferList.container_ids.map(item => ({
        container_id: item.id,
        quantity: Number(item.count)
      })),
      part_ids: store.transferList.part_ids.map(item => ({
        part_id: item.id,
        quantity: Number(item.count)
      })),
      number: data.value.number,
      warehouse_sender_id: data.value.from_warehouse,
      warehouse_receiver_id: data.value.to_warehouse
    }

    await store.createTransfer(reformatCode)
      .then((res) => {
        if (imageUrl.value) {
          const formData = new FormData()
          formData.append('files', userData.value.photo)

          store.updatePhotoTransfer({
            data: formData,
            id: res.id
          })
        }
      })
  // }
}



const codes = ref([])

const getMarkups = (id:any, index:any, count:any) => {
  if (store.transferList?.product_unit_markups?.[index]) {
    store.transferList.product_unit_markups[index].codes = []
  }

  store.getMarkups({ product_id: id, warehouse_id: data.value.from_warehouse })
    .then(() => {
      const length = store.markups.length
      const loopCount = length > 0 ? length : count // Use length of e.id or count

      for (let i = 0; i < loopCount; i++) {
        const e = store.markups[i] || {}
        const codeId = e.id ? e.id : ''

        store.transferList.product_unit_markups?.[index]?.codes.push({ id: codeId, checked: false })
      }
    })
}

const handleAddPro = (event: any, selected: string) => {

  const targetMap: { [key: string]: any[] } = {
    products: store.transferList.product_unit_markups,
    containers: store.transferList.container_ids,
    parts: store.transferList.part_ids
  }

  const targetArray = targetMap[selected] || targetMap.parts
  targetArray.push({ ...event, codes: codes.value, checked: false })
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
