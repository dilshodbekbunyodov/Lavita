<template>
  <head-part title="Отделы" :toggle="true" />
  <departmentsTable :data="departments" />
  <addDepartment @send="handleSave" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import addDepartment from '@/components/user/addDepartment.vue'
import departmentsTable from '@/components/user/departmentsTable.vue'
import { departmentStore } from '@/stores/user/department'
import type { Department } from '@/types/user'
const store = departmentStore()
const { departments } = storeToRefs(store)

const getData = async () => {
  await store.getAllDepartments({
    limit: 30
  })
}

const handleSave = async (department: Department) => {
  await store.addDepartment(department)
}

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
