<template>
  <head-part
    grayTitle="Прозводственной накладной"
    :title="invoice?.number"
    backLink="proinvoice"
    :downloadLink="`productinvoice/exportexcel/${id}`"
  >
    <button
      v-if="invoice.status"
      @click="changeStatus"
      :class="`px-3 py-2 ${invoice?.status == 'canceled' ? 'text-red-700 bg-red-100' : 'text-white bg-blue-600'}  rounded justify-center items-center gap-1 inline-flex`"
    >
      <div class="relative">
        <XMarkIcon v-if="invoice?.status == 'canceled'" class="size-4 text-red-700" />
        <CheckIcon v-if="invoice?.status == 'published'" class="size-4 text-white-700" />
      </div>
      <div :class="` text-sm font-medium leading-none`">
        {{ invoice?.status == 'canceled' ? 'Отменить накладную' : 'Опубликовать накладную' }}
      </div>
    </button>
  </head-part>

  <div class="px-6 py-2.5 flex gap-4 items-center bg-white border-b-gray-200 border-b-[1px]">
    <span
      :class="`px-2.5 py-0.5 rounded-[10px] flex-grow-0 flex-shrink-0 text-xs
      ${statusClass(invoice?.status)}
       font-medium text-center `"
    >
      {{ statusTitle(invoice?.status) }}
    </span>
    <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/calendar.svg?url" alt="" />
      {{ invoice?.updated_at ? convertDate(invoice?.updated_at, 'full') : '' }}
    </span>

    <span class="flex items-center gap-1 text-gray-600">
      <img src="@/assets/icons/cube.svg?url" alt="" />
      {{ invoice?.warehouse_receiver_address }}
    </span>
  </div>

  <div class="p-6 overflow-auto">
    <div class="flex gap-4">
      <div class="flex-1">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
          <div
            class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
          >
            Содержание производственной накладной
            <nav class="flex space-x-1 bg-gray-200 p-0.5 rounded-md" aria-label="Tabs">
              <button
                type="button"
                v-for="tab in productStatusList.filter((product) => product.value !== 0)"
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
          </div>
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
              >
                Последнее обновление
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span class="sr-only"> </span>
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="(pack, inx) in invoice[selected]"
              :key="inx"
              class="font-medium text-gray-900 text-sm"
            >
              <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                {{ pack?.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4">
                {{ pack?.quantity }}
              </td>
              <td class="whitespace-nowrap px-3 py-4">
                {{ pack?.created_at ? convertDate(pack?.created_at) : null }}
              </td>
              <td class="whitespace-nowrap px-3 text-right py-4">
                <button
                  type="button"
                  class="rounded-sm bg-blue-100 p-2 hover:bg-blue-300 hover:text-white text-blue-600"
                >
                  <img src="@/assets/icons/qrcode.svg?url" alt="" />
                </button>
              </td>
            </tr>

            <tr v-if="invoice[selected] && invoice[selected].length === 0">
              <td colspan="4" class="text-center p-3">
                <span class="text-sm">Нет данных</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-[420px] flex flex-col gap-3">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
          <div
            class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
          >
            Информация
          </div>

          <div class="p-4 border-b-[1px] border-gray-100">
            <div class="grid grid-cols-2 gap-2">
              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Номер накладной</div>
                <div class="text-sm font-medium">{{ invoice.number }}</div>
              </div>
              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Дата создания</div>
                <div class="text-sm font-medium">{{ convertDate(invoice.created_at, 'full') }}</div>
              </div>
              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Ответственный</div>
                <div class="text-sm font-medium">{{ invoice?.user_full_name }}</div>
              </div>
              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Склад</div>
                <div class="text-sm font-medium">
                  {{ invoice?.warehouse_receiver_address }}
                  <!--                  {{ invoice?.warehouse?.title }}-->
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 border-b-[1px] border-gray-100">
            <div class="grid grid-cols-2 gap-2">
              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Кол-во товаров</div>
                <div class="text-sm font-medium">
                  {{ invoice?.quantity }}
                </div>
              </div>
              <div class="flex flex-col">
                <div class="text-xs text-gray-500">Общая сумма</div>
                <div class="text-sm font-medium">{{ moneyFormatter(invoice?.price) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
          <div
            class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
          >
            Комментарии
          </div>

          <div
            v-if="(store.commentList && store.commentList?.length > 0) || false"
            class="p-4 border-b-[1px] border-gray-100 max-h-[300px] overflow-y-auto overflow-x-hidden"
          >
            <div
              class="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3 p-3 rounded-lg bg-gray-100 text-gray-500 mb-1 last:mb-3 overflow-hidden"
              v-for="comment of store.commentList"
              :key="comment.id"
            >
              <div
                class="flex items-center justify-center flex-grow-0 flex-shrink-0 w-10 h-10 rounded-full bg-gray-200"
              >
                <p v-if="comment?.user_full_name && comment?.user_full_name.length" class="text-sm text-center text-gray-500">
                  {{ comment?.user_full_name?.slice(0, 1).toUpperCase() }}
                </p>
                <img v-else :src="noPhoto" alt="noPhoto">
              </div>
              <div class="flex flex-col justify-start items-start flex-grow relative gap-0.5">
                <div
                  class="flex justify-start text-sm text-gray-500 items-start self-stretch flex-grow-0 flex-shrink-0 relative"
                >
                  <p v-if="comment?.user_full_name" class="flex-grow text-left overflow-hidden whitespace-nowrap">
                    {{ comment?.user_full_name }}
                  </p>
                  <p class="text-right w-[150px] overflow-hidden whitespace-nowrap pr-3 mr-2">
                    {{ convertDate(comment.created_at, 'full') }}
                  </p>
                </div>
                <p
                  class="self-stretch flex-grow-0 flex-shrink-0 w-[312px] text-base font-medium text-left text-gray-900"
                >
                  {{ comment.text }}
                </p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <la-input
              v-model="comment"
              placeholder="Ваш комментарий"
              @send="sendComment"
              :enter="true"
            />
            <button
              class="w-full text-sm mt-1 px-[17px] py-[9px] font-medium text-center rounded bg-blue-600 text-white disabled:cursor-not-allowed"
              :disabled="!comment"
              @click="sendComment"
            >
              Отправить комментарий
            </button>
          </div>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
          <div class="p-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100">
            История
          </div>

          <div class="p-4 border-b-[1px] border-gray-100">
            <div class="grid grid-cols-1 gap-3">
              <div class="flex gap-3" v-for="log of store.logs" :key="log.id">
                <div
                  class="ml-2"
                  v-if="log.curr_status == 'published'"
                  :class="{
                    'text-xs text-gray-500 w-8 h-8 flex items-center justify-center rounded-full': true,
                    'bg-green-600': log.curr_status == 'published',
                  }"
                >
                  <CheckCircleIcon class="size-5 text-white" />
                </div>

                <svg v-if="log.curr_status == 'canceled'" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_899_7118)">
                    <rect x="8" y="8" width="32" height="32" rx="16" fill="#DC2626"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2928 18.293C18.4803 18.1055 18.7346 18.0002 18.9998 18.0002C19.265 18.0002 19.5193 18.1055 19.7068 18.293L23.9998 22.586L28.2928 18.293C28.385 18.1974 28.4954 18.1213 28.6174 18.0689C28.7394 18.0164 28.8706 17.9889 29.0034 17.9877C29.1362 17.9866 29.2678 18.0119 29.3907 18.0621C29.5136 18.1124 29.6253 18.1867 29.7192 18.2806C29.8131 18.3745 29.8873 18.4861 29.9376 18.609C29.9879 18.7319 30.0132 18.8636 30.012 18.9964C30.0109 19.1291 29.9833 19.2604 29.9309 19.3824C29.8785 19.5044 29.8023 19.6147 29.7068 19.707L25.4138 24L29.7068 28.293C29.8889 28.4816 29.9897 28.7342 29.9875 28.9964C29.9852 29.2586 29.88 29.5094 29.6946 29.6948C29.5092 29.8802 29.2584 29.9854 28.9962 29.9876C28.734 29.9899 28.4814 29.8891 28.2928 29.707L23.9998 25.414L19.7068 29.707C19.5182 29.8891 19.2656 29.9899 19.0034 29.9876C18.7412 29.9854 18.4904 29.8802 18.305 29.6948C18.1196 29.5094 18.0144 29.2586 18.0121 28.9964C18.0098 28.7342 18.1106 28.4816 18.2928 28.293L22.5858 24L18.2928 19.707C18.1053 19.5194 18 19.2651 18 19C18 18.7348 18.1053 18.4805 18.2928 18.293Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_899_7118" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feMorphology radius="8" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_899_7118"/>
                      <feOffset/>
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_899_7118"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_899_7118" result="shape"/>
                    </filter>
                  </defs>
                </svg>

                <svg v-if="log.curr_status === 'draft'" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_940_793)">
                    <rect x="8" y="8" width="32" height="32" rx="16" fill="#6B7280"/>
                    <path d="M22 17C22 16.7348 22.1054 16.4804 22.2929 16.2929C22.4804 16.1054 22.7348 16 23 16H25C25.2652 16 25.5196 16.1054 25.7071 16.2929C25.8946 16.4804 26 16.7348 26 17C26 17.2652 25.8946 17.5196 25.7071 17.7071C25.5196 17.8946 25.2652 18 25 18H23C22.7348 18 22.4804 17.8946 22.2929 17.7071C22.1054 17.5196 22 17.2652 22 17Z" fill="white"/>
                    <path d="M20 17C19.4696 17 18.9609 17.2107 18.5858 17.5858C18.2107 17.9609 18 18.4696 18 19V30C18 30.5304 18.2107 31.0391 18.5858 31.4142C18.9609 31.7893 19.4696 32 20 32H28C28.5304 32 29.0391 31.7893 29.4142 31.4142C29.7893 31.0391 30 30.5304 30 30V19C30 18.4696 29.7893 17.9609 29.4142 17.5858C29.0391 17.2107 28.5304 17 28 17C28 17.7956 27.6839 18.5587 27.1213 19.1213C26.5587 19.6839 25.7956 20 25 20H23C22.2044 20 21.4413 19.6839 20.8787 19.1213C20.3161 18.5587 20 17.7956 20 17Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_940_793" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feMorphology radius="8" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_940_793"/>
                      <feOffset/>
                      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_940_793"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_940_793" result="shape"/>
                    </filter>
                  </defs>
                </svg>

                <div class="text-sm">
                  <div class="text-gray-500">
                    Статус изменён на

                    <span class="text-gray-900 font-medium">
                      {{ log.curr_status == 'published' ? 'Опубликовано' : '' }}
                      {{ log.curr_status == 'canceled' ? 'Отменён' : '' }}
                      {{ log.curr_status == 'draft' ? 'Черновик' : '' }}
                    </span>
                    <div>
                      {{ convertDate(log.created_at, 'full') }}
                    </div>
                    <div>Отредактировал
                      <!--                      {{ log.user.lastname }}-->
                      {{ log.user_full_name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <dialogModal
    btnTitle="Отменить накладную"
    title="Вы точно хотите отменить накладную?"
    :dialog="toggle"
    @answer="remove"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type getProInvoice } from '@/types/production/proInvoice'
import { proInvoiceStore } from '@/stores/invoice/proInvoice'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { convertDate } from '@/helpers/func'
import dialogModal from '../../../components/default/dialogModal.vue'
import { proinvoiceStatusList, type Status } from '@/types/helper'
import { XMarkIcon, CheckIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'
import { useNotification } from '@/stores/usefull/notification'
import noPhoto from '@/assets/nophoto.png?url'

const store = proInvoiceStore()
const route = useRoute()
const notification = useNotification()

const invoice = ref<getProInvoice>({
  status: 0,
  number: '',
  comments: [],
  warehouse: {
    address: '',
    title: '',
    users: []
  },
  product_lots: []
})
const id = ref<string>('')
const toggle = ref<boolean>(false)
const comment = ref<string>('')
const productStatusList = ref<Status[]>([
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
const selected = ref<number>('products')

onMounted(async () => {
  id.value = route.params.id as string
  await store.getComment({ invoice_id: id.value })

  if (route.params.id) {
    let { data } = await store.getProInvoice({ production_id: id.value })
    invoice.value = { ...data }

    // let resProductPack = await store.getProductPacks(id.value)
    // productPacks.value = [...resProductPack.data.data]

    await store.getLogs({ invoice_id: id.value })
  }
})
const changeStatus = async () => {
  await store.saveProInvoice({
    invoice_id: invoice?.value.id
  })
}

const statusClass = (e: any) => {
  const defaultStatus = e
  const statusObj = proinvoiceStatusList.find(item => item.value === (invoice.value.status || defaultStatus))
  return statusObj ? statusObj.class : ''
}

const statusTitle = (e: any) => {
  const defaultStatus = e
  const statusObj = proinvoiceStatusList.find(item => item.value === (invoice.value.status || defaultStatus))
  return statusObj ? statusObj.title : ''
}

const remove = async (answer: boolean) => {
  if (answer) {
    await store.saveProInvoice({
      _id: invoice.value._id,
      status: 3,
      number: invoice.value.number
    })
  }

  close()
}

const close = () => {
  toggle.value = false
  id.value = ''
}

const sendComment = async () => {
  await store.addComment({
    text: comment.value,
    params: {
      invoice_id: id.value
    }
  })
  await store.getComment({ invoice_id: id.value })
  notification.setNotif(true, 'Добавлено', 'success')
  comment.value = ''
}

const moneyFormatter = (num: any) => {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'UZS'
  }).format(num)
}

const setCurrent = (value: number) => {
  if (value) {
    selected.value = value
  }
}
</script>

