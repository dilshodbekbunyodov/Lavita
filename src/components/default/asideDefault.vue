<template>
  <aside class="w-[210px] !bg-[#1F2937] min-h-svh h-full sticky top-0 z-[2]">
    <img src="@/assets/asidelogo.svg?url" alt="" class="block mx-auto my-3" />
    <div class="border-b-[1px] border-gray-700"></div>
    <div class="links p-3">
      <div v-for="(item, index) in menu" :key="index">
        <button
          v-if="item.button"
          @click="setGroup(item.name)"
          class="hover-img flex p-2 w-full text-gray-400 rounded-lg hover:text-white items-center gap-2 text-sm hover:bg-[#374151s]"
          :class="{
            'text-white bg-[#374151] active-route': item.name == selecttedGroup
          }"
        >
          <img :src="item?.meta?.icon"/>
          {{ item?.meta?.title }}
        </button>
        <router-link
          v-else
          :to="{ name: item.name }"
          @click="clearGroup"
          class="hover-img flex p-2 text-gray-400 rounded-lg hover:text-white items-center gap-2 text-sm hover:bg-[#374151]"
          :class="{
            'bg-[#374151] text-white active-route':
              (item.name == route.name || item.meta?.active?.includes(route.name)) && !toggleSide
          }"
        >
          <img :src="item?.meta?.icon" class="fill-[#374151]"/>
          {{ item?.meta?.title }}
        </router-link>
      </div>
    </div>
  </aside>
  <nav
    v-if="toggleSide"
    class="fixed w-dvw bg-gray-900/60 h-dvh z-[1] pl-[210px]"
    @click.self="clearGroup"
  >
    <div class="w-[210px] bg-gray-700 h-dvh flex flex-col p-2">
      <router-link
        @click="clearGroup"
        v-for="(item2, inx2) in submenu.filter((link) => link?.meta?.group == selecttedGroup)"
        :key="inx2"
        :to="{ name: item2.name, query: item2.meta.query }"
        class="p-2 block text-white font-medium font-base hover:underline"
      >
        {{ item2.meta?.title }}
      </router-link>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { submenu } from '@/helpers/menu'
import { ref } from 'vue'
import cube from '@/assets/icons/cube2.svg?url'
import department from '@/assets/icons/user2.svg?url'
import production from '@/assets/production2.svg?url'

const route = useRoute()
const toggleSide = ref<boolean>(false)
const selecttedGroup = ref<string>('')
const setGroup = (group: string) => {
  selecttedGroup.value = group
  toggleSide.value = true
}
const clearGroup = () => {
  selecttedGroup.value = ''
  toggleSide.value = false
}

const menu = [
  {
    name: 'warehouses',
    button: true,
    meta: {
      title: 'Склады',
      icon: cube,
      active: ['createwarehouse', 'warehouses']
    }
  },
  {
    name: 'user',
    button: true,
    meta: {
      title: 'Персонал',
      icon: department,
      active: ['showdepartment', 'departments']
    }
  },
  {
    name: 'finance',
    button: true,
    meta: {
      title: 'Финансы',
      icon: production,
      active: []
    }
  }
]
</script>
<style lang="scss">
// .links a svg,
// .links a svg path {
//   fill: #374151;
//   stroke: #374151;
// }
// a.active-route svg,
// a.active-route svg path,
// .links a.router-link-active svg path,
// .links a.router-link-active svg,
// .links a:hover svg path,
// .links a:hover svg {
//   fill: #6b7280;
//   stroke: #6b7280;
// }
</style>
