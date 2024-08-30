<template>
  <head-part title="Фильтры" :toggle="true" />

  <statusList :list="list" />

  <div class="px-6">
    <filterTable />

    <paginate
      class="mt-1"
      v-if="store.filterListPagination.total_pages"
      :page-count="store.filterListPagination.total_pages"
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

    <addFilters @send="handleSave" />
  </div>
</template>

<script setup lang="ts">
import statusList from './components/statusList.vue'
import filterTable from './components/filterTable.vue'
import addFilters from './components/addFilters.vue'
import { onMounted, ref, watch } from 'vue'
import { filtersStore } from '@/stores/filters/filters'
import { useRoute } from 'vue-router'
import { useNotification } from '@/stores/usefull/notification'

const route = useRoute()
const store = filtersStore()
const notification = useNotification()

const list = ref([
  {
    title: 'Все фильтры',
    value: '',
    current: true,
    route: {
      name: ''
    }
  },
  {
    title: 'Активные',
    value: 'true',
    current: false,
    route: {
      name: 'filters',
      query: { status: 'true' }
    }
  },
  {
    title: 'Неактыные',
    value: 'false',
    current: false,
    route: {
      name: 'filters',
      query: { status: 'false' }
    }
  }
])

onMounted(async () => {
  getData()
  await store.getAllProducts({limit: 50})
})

watch(() => route.query, () => {
  getData()
})

const getData = () => {
  store.getAllFilters({
    is_active: route.query.status,
    limit: 10,
    page: 1
  })
}

const clickCallback = async (e: any) => {
  await store.getAllFilters({
    limit: 10,
    page: e
  })
}

const handleSave = (filters: any) => {
  store.createFilter({
    name: filters.name,
    product_id: filters.product_id,
    date_of_receive: new Date(filters.date_of_receive).toISOString()
  })
    .then(() => {
      getData()
      notification.setNotif(true, 'Успешно добавлено', 'success')
    }).catch((e) => {
    notification.setNotif(true, e, 'danger')
  })
}
</script>

