<template>
  <div class="flex bg-gray-100 flex-row overflow-hidden h-dvh">
    <asideDefault />
    <div class="wrapper flex-1 flex flex-col">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import asideDefault from '@/components/default/asideDefault.vue'
import { authStore } from '@/stores/user/auth'
import { onMounted } from 'vue'
import { getCookie } from 'typescript-cookie'

import { useRouter } from 'vue-router'
const auth = authStore()

const router = useRouter()
onMounted(async () => {
  if (getCookie('lavita-token')) {
    return await auth.checkUser()
  }
  router.push({ name: 'signIn' })
})
</script>

<style lang="scss"></style>
