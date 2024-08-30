<template>
  <div>
    <head-part
      grayTitle="Фильтр "
      :title="store.filterListDetail.id"
      backLink="filters"
    >
      <button @click="handleDelete" class="text-[#B91C1C] bg-[#FEE2E2] py-[9px] px-[13px] flex items-center rounded">
        <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3.43442 3.43442C3.58445 3.28444 3.78789 3.20019 4.00002 3.20019C4.21216 3.20019 4.4156 3.28444 4.56562 3.43442L8.00002 6.86882L11.4344 3.43442C11.5082 3.35801 11.5965 3.29706 11.6941 3.25514C11.7917 3.21321 11.8967 3.19114 12.0029 3.19022C12.1091 3.18929 12.2145 3.20953 12.3128 3.24976C12.4111 3.28998 12.5004 3.34939 12.5755 3.4245C12.6507 3.49961 12.7101 3.58894 12.7503 3.68725C12.7905 3.78557 12.8107 3.89091 12.8098 3.99714C12.8089 4.10336 12.7868 4.20834 12.7449 4.30594C12.703 4.40354 12.642 4.49182 12.5656 4.56562L9.13122 8.00002L12.5656 11.4344C12.7114 11.5853 12.792 11.7874 12.7902 11.9971C12.7883 12.2069 12.7042 12.4075 12.5559 12.5559C12.4076 12.7042 12.2069 12.7883 11.9971 12.7902C11.7874 12.792 11.5853 12.7113 11.4344 12.5656L8.00002 9.13122L4.56562 12.5656C4.41474 12.7113 4.21266 12.792 4.0029 12.7902C3.79315 12.7883 3.5925 12.7042 3.44417 12.5559C3.29584 12.4075 3.21171 12.2069 3.20989 11.9971C3.20806 11.7874 3.2887 11.5853 3.43442 11.4344L6.86883 8.00002L3.43442 4.56562C3.28445 4.41559 3.2002 4.21215 3.2002 4.00002C3.2002 3.78788 3.28445 3.58444 3.43442 3.43442Z"
                fill="#B91C1C" />
        </svg>
        Удалить фильтр
      </button>
    </head-part>

    <div class="px-6 py-2.5 flex gap-4 items-center bg-white border-b-gray-200 border-b-[1px]">
    <span
      :class="store.filterListDetail.is_active ? 'bg-green-100' : 'bg-[#FEE2E2]'"
      class="font-medium text-green-800 text-xs px-[10px] py-[2px] rounded"
    >
      {{ store.filterListDetail.is_active ? 'Активные' : 'Неактыные' }}
    </span>
      <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/calendar.svg?url" alt="" />
      {{ convertDate(store.filterListPagination.date_of_receive, 'full') }}
    </span>

      <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/cube.svg?url" alt="" />
      {{ store.filterListDetail.name && store.filterListDetail.name }}
    </span>
    </div>

    <div class="flex items-baseline w-[100%] gap-5 mt-5 px-5">
      <div class="w-[65%] bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div class="pb-4 ">
          <div  class="flex items-center justify-between py-3 px-4 font-semibold border-b-[1px] border-gray-200 ">
            <div class="flex items-center justify-between w-full">
              <div class="text-[#111827]">
                Маркировки
              </div>

              <button
                v-if="!isCreate"
                class="text-[#1D4ED8] bg-[#DBEAFE] py-[7px] px-[10px] flex items-center rounded"
                      @click="isCreate = !isCreate">
                <svg class="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 3.5C7.18565 3.5 7.3637 3.57375 7.49497 3.70503C7.62625 3.8363 7.7 4.01435 7.7 4.2V6.3H9.8C9.98565 6.3 10.1637 6.37375 10.295 6.50503C10.4262 6.6363 10.5 6.81435 10.5 7C10.5 7.18565 10.4262 7.3637 10.295 7.49497C10.1637 7.62625 9.98565 7.7 9.8 7.7H7.7V9.8C7.7 9.98565 7.62625 10.1637 7.49497 10.295C7.3637 10.4262 7.18565 10.5 7 10.5C6.81435 10.5 6.6363 10.4262 6.50503 10.295C6.37375 10.1637 6.3 9.98565 6.3 9.8V7.7H4.2C4.01435 7.7 3.8363 7.62625 3.70503 7.49497C3.57375 7.3637 3.5 7.18565 3.5 7C3.5 6.81435 3.57375 6.6363 3.70503 6.50503C3.8363 6.37375 4.01435 6.3 4.2 6.3H6.3V4.2C6.3 4.01435 6.37375 3.8363 6.50503 3.70503C6.6363 3.57375 6.81435 3.5 7 3.5Z"
                        fill="#1D4ED8" />
                </svg>

                <small>Добавить файл</small>
              </button>

              <div v-else class="flex items-center">
                <button class="py-[4px] px-[10px] rounded border" @click="isCreate = !isCreate"><small class="mb-0">Отмена</small></button>

                <button
                  class="text-[#1D4ED8] bg-[#DBEAFE] py-[7px] px-[10px] flex items-center rounded ml-2"
                  @click="addMarkups">
                  <svg class="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M7 3.5C7.18565 3.5 7.3637 3.57375 7.49497 3.70503C7.62625 3.8363 7.7 4.01435 7.7 4.2V6.3H9.8C9.98565 6.3 10.1637 6.37375 10.295 6.50503C10.4262 6.6363 10.5 6.81435 10.5 7C10.5 7.18565 10.4262 7.3637 10.295 7.49497C10.1637 7.62625 9.98565 7.7 9.8 7.7H7.7V9.8C7.7 9.98565 7.62625 10.1637 7.49497 10.295C7.3637 10.4262 7.18565 10.5 7 10.5C6.81435 10.5 6.6363 10.4262 6.50503 10.295C6.37375 10.1637 6.3 9.98565 6.3 9.8V7.7H4.2C4.01435 7.7 3.8363 7.62625 3.70503 7.49497C3.57375 7.3637 3.5 7.18565 3.5 7C3.5 6.81435 3.57375 6.6363 3.70503 6.50503C3.8363 6.37375 4.01435 6.3 4.2 6.3H6.3V4.2C6.3 4.01435 6.37375 3.8363 6.50503 3.70503C6.6363 3.57375 6.81435 3.5 7 3.5Z"
                          fill="#1D4ED8" />
                  </svg>

                  <small>Добавить файл</small>
                </button>
              </div>
            </div>
          </div>
<!--<pre>{{store.filterListDetail.markups}}</pre>-->
          <template v-if="isCreate">
            <div class="px-4 mt-2">
              <label class="block text-sm font-medium leading-6 text-gray-900">Вставьте файл</label>
              <input type="file" id="inputFile" style="display: none" @change="handleFileUpload">
              <label for="inputFile">
                <div
                  class="mt-2 flex items-center p-[50px] justify-center w-[100%] border-dashed border-2 rounded text-[#2563EB] text-sm">
                  <svg class="mr-2" width="19" height="20" viewBox="0 0 19 20" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.172 4.99998L5.58602 11.586C5.395 11.7705 5.24264 11.9912 5.13782 12.2352C5.033 12.4792 4.97783 12.7416 4.97552 13.0072C4.97321 13.2727 5.02381 13.5361 5.12438 13.7819C5.22494 14.0277 5.37344 14.251 5.56123 14.4388C5.74902 14.6266 5.97232 14.7751 6.21811 14.8756C6.4639 14.9762 6.72726 15.0268 6.99282 15.0245C7.25838 15.0222 7.52082 14.967 7.76483 14.8622C8.00884 14.7574 8.22953 14.605 8.41402 14.414L14.828 7.82798C15.5567 7.07357 15.9598 6.06316 15.9507 5.01438C15.9416 3.96559 15.5209 2.96234 14.7793 2.22071C14.0377 1.47907 13.0344 1.0584 11.9856 1.04928C10.9368 1.04017 9.92643 1.44335 9.17202 2.17198L2.75702 8.75698C1.63171 9.88229 0.999512 11.4085 0.999512 13C0.999512 14.5914 1.63171 16.1177 2.75702 17.243C3.88233 18.3683 5.40859 19.0005 7.00002 19.0005C8.59145 19.0005 10.1177 18.3683 11.243 17.243L17.5 11"
                      stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Выберите файл (xls, xlsx, csv)
                </div>
              </label>
            </div>

            <div v-if="files" class="mt-5 px-5 flex items-center">
              <svg style="height: 50px; width: 50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(100,205,138,1)">
                <path
                  d="M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM13.2 12L16 8H13.6L12 10.2857L10.4 8H8L10.8 12L8 16H10.4L12 13.7143L13.6 16H16L13.2 12Z"></path>
              </svg>
              <div class="ml-2">
                <div class="text-sm">{{ fileName1 }}</div>
                <div class="text-[#DC2626] text-xs cursor-pointer" @click="files = ''">
                  Удалить товар
                </div>
              </div>
            </div>
          </template>

         <div class="h-[600px] overflow-y-auto" v-else>
           <table  class="min-w-full divide-y divide-gray-300">
             <thead class="bg-gray-50">
             <tr>
               <th
                 scope="col"
                 class="py-3.5 pl-4 pr-3 text-left font-medium uppercase text-sm text-gray-400 sm:pl-6"
               >
                 №
               </th>
               <th
                 scope="col"
                 class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
               >
                 Маркировка
               </th>
               <th
                 scope="col"
                 class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
               >
                 Статус
               </th>
               <th
                 scope="col"
                 class="px-3 py-3.5 text-left font-medium uppercase text-sm text-gray-400"
               >
                 Дата использования
               </th>
             </tr>
             </thead>
             <tbody class="divide-y divide-gray-200 bg-white">
             <tr
               v-for="(item, index) in store.filterListDetail.markups"
               :key="index"
               class="hover:cursor-pointer"
             >
               <td
                 class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
               >
                 {{index + 1}}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                 {{ item.id }}
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span
                                    :class="item.is_used ? '!bg-green-100 !text-[#065F46]' : '!bg-[#FEE2E2] !text-[#991B1B]'"
                                    class="font-medium text-green-800 text-xs px-[10px] py-[2px] rounded"
                                  >
                                       {{ item.is_used ? 'Использовано' : 'Не использовано' }}
                                    </span>
               </td>
               <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                 {{ item.date_of_use ? convertDate(item.date_of_use, 'full') : '' }}
               </td>
             </tr>

             <tr v-if="store.filterListDetail.markups && store.filterListDetail.markups.length === 0">
               <td colspan="4" class="text-center p-3">
                 <span class="text-sm">Нет данных</span>
               </td>
             </tr>
             </tbody>
           </table>
         </div>

        </div>
      </div>

      <div class="w-[35%]">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl pb-">
          <div class="flex items-center justify-between py-3 px-4 font-semibold border-b-[1px] border-gray-200">
            <div class="flex items-center justify-between w-full">
              <div class="text-[#111827]">
                Информация
              </div>

              <div v-if="isEdit">
                <button class="py-[7px] px-[10px] border rounded" @click="closIsedit">Отмена</button>
                <button class="py-[7px] px-[10px] bg-[#2563EB] text-white ml-2 rounded" @click="updateValues">
                  Сохранить
                </button>
              </div>

              <button v-else @click="isEdit = !isEdit"
                      class="text-[#1D4ED8] bg-[#DBEAFE] py-[7px] px-[10px] flex items-center rounded">
                <svg class="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.1898 1.81017C11.9273 1.54771 11.5713 1.40027 11.2 1.40027C10.8288 1.40027 10.4728 1.54771 10.2102 1.81017L4.90002 7.12037V9.09997H6.87962L12.1898 3.78977C12.4523 3.52723 12.5997 3.1712 12.5997 2.79997C12.5997 2.42874 12.4523 2.07271 12.1898 1.81017Z"
                    fill="#1D4ED8" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.40002 4.20005C1.40002 3.82875 1.54752 3.47265 1.81007 3.2101C2.07263 2.94755 2.42872 2.80005 2.80002 2.80005H5.60002C5.78568 2.80005 5.96372 2.8738 6.095 3.00507C6.22627 3.13635 6.30002 3.3144 6.30002 3.50005C6.30002 3.6857 6.22627 3.86375 6.095 3.99502C5.96372 4.1263 5.78568 4.20005 5.60002 4.20005H2.80002V11.2H9.80002V8.40005C9.80002 8.2144 9.87377 8.03635 10.005 7.90507C10.1363 7.7738 10.3144 7.70005 10.5 7.70005C10.6857 7.70005 10.8637 7.7738 10.995 7.90507C11.1263 8.03635 11.2 8.2144 11.2 8.40005V11.2C11.2 11.5714 11.0525 11.9274 10.79 12.19C10.5274 12.4525 10.1713 12.6 9.80002 12.6H2.80002C2.42872 12.6 2.07263 12.4525 1.81007 12.19C1.54752 11.9274 1.40002 11.5714 1.40002 11.2V4.20005Z"
                        fill="#1D4ED8" />
                </svg>


                <small>Изменить</small>
              </button>
            </div>
          </div>
          <div class="px-4 mt-2 pb-4">
            <div class="flex flex-col mb-3" v-if="!isEdit">
              <div class="text-xs text-gray-500">Товар</div>
              <div class="text-sm font-medium">
                <!--                <input v-if="isEdit" type="text" placeholder="Название товара" class="outline-0 formInput" v-model="dataValue.product_name">-->
                <div class="text-sm font-medium">{{ store.filterListDetail.product_name }}</div>
              </div>
            </div>

            <div class="flex flex-col mb-3">
              <div class="text-xs text-gray-500">Название</div>
              <input v-if="isEdit" type="text" placeholder="Название фильтра" class="outline-0 formInput mt-2"
                     v-model="dataValue.name">
              <div v-else class="text-sm font-medium">{{ store.filterListDetail.name && store.filterListDetail.name }}
              </div>
            </div>

            <div class="mb-3" v-if="!isEdit">
              <div class="text-xs text-gray-500">Статус</div>
              <!--              <input v-if="isEdit" type="checkbox" placeholder="Активен" class="outline-0 mt-2" v-model="dataValue.is_active">-->
              <div class="text-sm font-medium"> {{ store.filterListDetail.is_active ? 'Активные' : 'Неактыные' }}</div>
            </div>

            <div class="flex flex-col">
              <div class="text-xs text-gray-500">Дата получения</div>
              <input v-if="isEdit" type="date" placeholder="Активен" class="outline-0 formInput mt-2"
                     v-model="dataValue.date_of_receive">
              <div v-else class="text-sm font-medium">
                {{ convertDate(store.filterListPagination.date_of_receive, 'full') }}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-4 pb-4">
          <div class="flex items-center justify-between py-3 px-4 font-semibold border-b-[1px] border-gray-200">
            <div class="flex items-center justify-between w-full">
              <div class="text-[#111827]">
                Количество маркировок
              </div>
            </div>
          </div>
          <div class="px-4 mt-2">
            <div class="flex items-center justify-between">
              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Всего</div>
                <div class="text-xl font-medium">{{ store.filterListDetail.markups_quantity }} шт.</div>
              </div>

              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Использован</div>
                <div class="text-xl font-medium">{{ store.filterListDetail.used_markups_quantity }} шт.</div>
              </div>

              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Не использован</div>
                <div class="text-xl font-medium">{{ store.filterListDetail.unused_markups_quantity }} шт.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { filtersStore } from '@/stores/filters/filters'
import { useRoute, useRouter } from 'vue-router'
import { convertDate } from '@/helpers/func'
import { useNotification } from '@/stores/usefull/notification'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()
const store = filtersStore()
const notification = useNotification()

interface Values {
  name: null | string
  date_of_receive: null | string
}

const isEdit = ref(false)
const files = ref(null)
const fileName1 = ref(null)
const userData = ref({
  file: null
})
const isCreate = ref(false)
const dataValue = ref<Values>({
  // product_name: null,
  name: null,
  // is_active: false,
  date_of_receive: null
})

onMounted(async () => {
  await getData()
})

const getData = async () => {
  let res = { filter_id: route.params.id }
  await store.getAllFiltersDetail(res)
  // dataValue.value.product_name = store.filterListDetail.product_name
  dataValue.value.name = store.filterListDetail.name
  // dataValue.value.is_active = store.filterListDetail.is_active
  dataValue.value.date_of_receive = store.filterListDetail.date_of_receive
}

const handleDelete = () => {
  store.deleteFilter({
    filter_id: route.params.id
  }).then(() => {
    router.push('/filters')
    notification.setNotif(true, 'успешно удалено', 'success')
  }).catch((e) => {
    notification.setNotif(true, e, 'danger')
  })
}

const updateValues = () => {
  store.updateFilter({
    filter_id: {
      id: route.params.id
    },
    data: {
      name: dataValue.value.name,
      date_of_receive: new Date(dataValue.value.date_of_receive).toISOString()
    }
  }).then(() => {
    getData()
    isEdit.value = !isEdit.value
    notification.setNotif(true, 'Успешно отредактировано', 'success')
  }).catch((e) => {
    notification.setNotif(true, e, 'danger')
  })
}

const closIsedit = () => {
  isEdit.value = !isEdit.value
  getData()
}

const handleFileUpload = (event: any) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  fileName1.value = file.name

  reader.onload = (event: any) => {
    files.value = event.target.result
    userData.value.file = file
  }
  reader.readAsDataURL(file)
}

const addMarkups = () => {
  const formData = new FormData()
  formData.append('file', userData.value.file)

  store.createMarkups({
    filter_id: route.params.id,
    data: formData
  }).then(() => {
    files.value = null
    fileName1.value = null
    notification.setNotif(true, 'Добавлено', 'success')
    isCreate.value = !isCreate.value
    getData()
  }).catch((e) => {
    if (e?.response?.data?.data === 'Unsupported file format message') {
      notification.setNotif(true, 'Только xls, xlsx, csv', 'danger')
    } else {
      notification.setNotif(true, e, 'danger')
    }
  })

}
</script>

<style>
.formInput {
  @apply block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6
}
</style>
