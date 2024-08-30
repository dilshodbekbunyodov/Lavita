<template>
  <div class="space-y-4">
    <div class="bg-white shadow ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div
        class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
      >
        Склад
      </div>
      <div class="grid grid-cols-3 gap-3 p-4">
        <div
          class="bg-gray-100 w-full px-3 py-[14px] rounded flex justify-between"
          v-for="item of 9"
          :key="item"
        >
          <div class="text-gray-900 font-medium">Создать накладные</div>
          <la-checkbox />
        </div>
      </div>
    </div>
    <div class="bg-white shadow ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div
        class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
      >
        Производство
      </div>
      <div class="grid grid-cols-3 gap-3 p-4">
        <div
          class="bg-gray-100 w-full px-3 py-[14px] rounded flex justify-between"
          v-for="item of 6"
          :key="item"
        >
          <div class="text-gray-900 font-medium">Создать накладные</div>
          <la-checkbox />
        </div>
      </div>
    </div>
    <div class="bg-white shadow ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div
        class="py-3 px-4 text-base flex justify-between items-center font-semibold border-b-[1px] border-gray-100"
      >
        Отчёты
      </div>
      <div class="grid grid-cols-3 gap-3 p-4">
        <div
          class="bg-gray-100 w-full px-3 py-[14px] rounded flex justify-between"
          v-for="item of 6"
          :key="item"
        >
          <div class="text-gray-900 font-medium">Создать накладные</div>
          <la-checkbox />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
