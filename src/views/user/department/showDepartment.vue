<template>
    <head-part grayTitle="Склад" title="Грузчики" backLink="departments" downloadLink="test" />
    <div class="px-6 py-2.5 flex gap-4 items-center bg-white border-b-gray-200 border-b-[1px]">
        <span class="flex items-center gap-1 text-gray-600">
            <img src="@/assets/icons/staff/user-group.svg?url" alt="" />
            5 груп
        </span>
        <span class="flex items-center gap-1 text-gray-600">
            <img src="@/assets/icons/staff/users.svg?url" alt="" />
            15 подгруп
        </span>
        <span class="flex items-center gap-1 text-gray-600">
            <img src="@/assets/icons/staff/user.svg?url" alt="" />
            124 сотрудников
        </span>

        <span class="flex ml-auto items-center gap-1 text-gray-600">
            <img src="@/assets/icons/staff/user-circle.svg?url" alt="" />
            Юсупов Сироджбек
        </span>
    </div>
    <la-tabs :list="list" :nostatus="true" />
    <div class="px-6 overflow-auto flex-1">
        <router-view />
    </div>
</template>
<script setup lang="ts">
import type { Status } from '@/types/helper';
import { ref } from 'vue';


const list = ref<Status[]>([
    {
        title: 'Сотрудники',
        value: 'department_employee',
        current: false,
        route: {
            name: 'department_employee'
        }
    },
    {
        title: 'Настройки',
        value: 'department_settings',
        current: false,
        route: {
            name: 'department_settings'
        }
    }
])

</script>
<style lang="">
    
</style>