<template>
  <head-part title="Создание товара" backLink="production" />
  <div class="px-6 py-3.5 flex-1 flex flex-col overflow-auto">
    <div class="max-w-md">
      <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl" @submit.prevent>
        <div class="p-4 text-base font-semibold border-b-[1px] border-gray-100">Информация</div>
        <div class="p-4">
          <la-input
            v-model="data.name"
            name="name"
            label="Название товара"
            placeholder="Введите название"
          />
          <div v-if="error?.name">
            <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
          </div>
          <div class="mt-4 flex gap-4">
            <div class="flex-1">
              <la-select
                v-model="data.measurement"
                label="Единица измерения"
                :list="productUnitList"
                name="title"
                :disabled="type == 1 || type == 3"
              />
            </div>
            <div class="flex-1">
              <!-- {{ productStatusList.filter((pr) => pr.value !== 0) }} -->
              <la-select
                v-model="type"
                label="Тип"
                :list="productStatusList2.filter((pr) => pr.value !== 0)"
                name="title"
              />
            </div>
          </div>
          <div class="mt-4">
            <la-textarea
              v-model="data.description"
              label="Описание товара"
              placeholder="Напишите описание"
            />
          </div>
          <div class="mt-4">
            <!-- <la-uploadphoto placeholder="Выберите файл" v-model="data.photo" @input="getFile" /> -->
            <div class="file-input-wrapper">
              <input
                type="file"
                id="fileInput"
                ref="fileInput"
                @change="handleFileChange"
                style="display: none"
              />
              <label for="fileInput" class="file-input-label grow">
                <div v-if="selectedFile" class="file-details">
                  <img :src="filePreview" alt="Selected File" class="file-preview" />
                  <div class="file-info">
                    <p>{{ selectedFile.name }}</p>
                    <p>{{ fileSize }} MB</p>
                  </div>
                </div>
                <div v-else class="w-full text-center">
                  <p class="file-placeholder-text">Выберите файл</p>
                </div>
              </label>
              <button v-if="selectedFile" @click="removeFile" class="remove-file-button">-</button>
            </div>
          </div>

          <div class="mt-4 flex">
            <button
              v-if="type == 3"
              type="submit"
              :disabled="type == 3 && !data.name"
              @click="save"
              class="rounded-md flex-1 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-blue-400"
            >
              Создать товар
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="flex mt-6 gap-6 pt-6 border-t-2 border-gray-200" v-if="type !== 3">
      <detailProduct @add="handleAdd" :type="type" />

      <div class="flex-1">
        <addProduct v-model="data.details" @save="save" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import detailProduct from '@/components/production/detailProduct.vue'
import addProduct from '@/components/production/addProduct.vue'
import { ref, watch, computed, onMounted } from 'vue'
import {
  type Product,
  type Detail,
  productUnitList,
  productStatusList2
} from '@/types/production/product'
import { productStore } from '@/stores/production/product'
import { userStore } from '@/stores/user/user'
import { useRoute, useRouter } from 'vue-router'

const user_store = userStore()
const store = productStore()
const model = defineModel()
const router = useRouter()
const route = useRoute()
const photo = ref(null)

const type = ref<Number | null>(null)
const data = ref<Product>({
  name: '',
  description: '',
  measurement: '',
  photo: null,
  details: []
})

onMounted(async () => {
  try {
    await store.getParts({ limit: 100 })
  } catch (err) {}
})

const selectedFile = ref(null)
const fileInput = ref(null)
const filePreview = ref('')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  photo.value = file
  if (file) {
    selectedFile.value = file
    filePreview.value = URL.createObjectURL(file)
  }
}

const removeFile = () => {
  selectedFile.value = null
  filePreview.value = ''
  fileInput.value.value = null
  photo.value = null
}

const fileSize = computed(() => {
  return (selectedFile.value.size / (1024 * 1024)).toFixed(2)
})
type Error = {
  title?: boolean
}
const error = ref<Error>({
  title: false
})

const save = async () => {
  if (data.value.name.length == 0) {
    error.value.title = true
  } else {
    if (type.value == 3) {
      let newData: object = {
        measurement: data.value.measurement,
        name: data.value.name,
        description: data.value.description
      }
      const res = await store.createPart(newData)

      if (photo.value && res.data && res.data.id) {
        const formData = new FormData()
        console.log(photo.value)

        if (photo.value) {
          formData.append('photo', photo.value)
        }

        store.updatePhotoPart({ id: res.data.id, data: formData })
      }
    } else if (type.value == 1) {
      const parts = data.value.details.filter((item) => item.type === 'part')
      const containers = data.value.details.filter((item) => item.type === 'container')

      const newData = {
        measurement: data.value.measurement,
        name: data.value.name,
        description: data.value.description,
        parts_r: parts.map((item: object) => {
          return {
            part_id: item.id,
            quantity: item.count
          }
        })
      }

      const res = await store.createContainer(newData)

      if (photo.value && res.data && res.data.id) {
        const formData = new FormData()

        if (photo.value) {
          formData.append('photo', photo.value)

          store.updatePhotoContainer({ id: res.data.id, data: formData })
        }
      }
    } else if (type.value == 2) {
      const parts = data.value.details.filter((item) => item.type === 'part')
      const containers = data.value.details.filter((item) => item.type === 'container')

      const newData = {
        measurement: data.value.measurement,
        name: data.value.name,
        description: data.value.description,
        parts_r: parts.map((item: object) => {
          return {
            part_id: item.id,
            quantity: item.count
          }
        }),
        containers_r: containers.map((item: object) => {
          return {
            container_id: item.id,
            quantity: item.count
          }
        })
      }

      const res = await store.addProduct(newData)

      if (photo.value && res.data && res.data.id) {
        const formData = new FormData()

        if (photo.value) {
          formData.append('photo', photo.value)

          store.updatePhotoProduct({ id: res.data.id, data: formData })
        }
      }
    }

    router.push({ path: '/production', query: { type: 0 } })
  }
}

const handleAdd = (product: Detail) => {
  data.value.details.push({
    id: product.id,
    name: product.name,
    type: product.type,
    count: 0,
    unit: product.unit
  })
  console.log(data.value.products)
}

watch(
  () => data.value,
  () => {
    model.value = { ...data.value }
  }
)

watch(
  () => type.value,
  (val: number) => {
    if (val == 1 || val == 3) {
      data.value.measurement = 'q'
    }
  }
)
</script>
<style lang="scss">
.file-input-wrapper {
  display: flex;
  padding: 10px;
  align-items: center;
  border: 1px dashed #ccc;
  height: 144px;
  text-align: center;
  border-radius: 5px;
  position: relative;
}

.file-input-label {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.file-details {
  display: flex;
  align-items: center;
}

.file-preview {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.file-info p {
  margin: 0;
  line-height: 1.2;
}

.file-placeholder-text {
  color: #888;
}

.remove-file-button {
  background-color: red;
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: 10px;
}
</style>
