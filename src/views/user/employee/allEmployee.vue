<template>
  <head-part title="Сотрудники" :toggle="true" />
  <div class="px-6 py-3.5 flex-1 flex flex-col">
    <statusList />
    <FilterUser />
    <usersTable :data="users" />
  </div>
  <AddUser @send="handleSave" />
</template>
<script setup lang="ts">
import AddUser from '@/components/user/addUser.vue'
import FilterUser from '@/components/user/filterUser.vue'
import statusList from '@/components/user/statusList.vue'
import usersTable from '@/components/user/usersTable.vue'

import { type User } from '@/types/user'

import { userStore } from '@/stores/user/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const store = userStore()
const { users } = storeToRefs(store)

const handleSave = async (user: User) => {
  await store.addUser(user)
}
const route = useRoute()
const getData = async () => {
  await store.getAllUsers({
    limit: 30
  })
}

onMounted(() => {
  getData()
})
</script>
<style lang=""></style>
