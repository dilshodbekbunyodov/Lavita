<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" :src="logo" />
    </div>

    <div class="mt-10 mx-auto w-full max-w-64">
      <form @submit.prevent="submit" class="space-y-3">
        <div>
          <label for="login" class="block text-sm font-medium leading-6 text-gray-900">Логин</label>
          <div class="mt-2">
            <input
              id="login"
              name="login"
              type="login"
              v-model="user.username"
              placeholder="Введите логин"
              autocomplete="off"
              class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
              :class="{
                'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500':
                  v$.username.$invalid && v$.username.$dirty
              }"
            />
          </div>
          <span v-if="v$.username.$invalid && v$.username.$dirty">
            <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
          </span>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >Пароль</label
            >
          </div>

          <div class="mt-2 flex rounded-md">
            <div class="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                id="password"
                name="password"
                :type="toggle ? 'text' : 'password'"
                v-model="user.password"
                autocomplete="current-password"
                class="block w-full focus:ring-inset focus:ring-blue-600 focus:ring-2 py-1.5 px-2.5 ring-gray-300 rounded-md border-0 ring-1 ring-inset text-gray-900 shadow-sm placeholder:text-gray-400 bg-white focus:outline-0 sm:text-sm sm:leading-6"
                aria-invalid="true"
                :class="{
                  'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500':
                    v$.password.$invalid && v$.password.$dirty
                }"
              />

              <button
                type="button"
                @click="toggle = !toggle"
                class="absolute right-0 inline-flex p-2"
              >
                <EyeIcon v-if="!toggle" class="size-5 text-gray-400" />
                <EyeSlashIcon v-else class="size-5 text-gray-400" />
              </button>
            </div>
          </div>
          <span v-if="v$.password.$invalid && v$.password.$dirty">
            <p class="mt-2 text-xs text-red-600" id="email-error">Обязательное поле</p>
          </span>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Login } from '../../types/user'
import logo from '@/assets/logo.svg?url'
import { authStore } from '@/stores/user/auth'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { Form } from 'vee-validate'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  username: { required },
  password: { required }
}

const store = authStore()
const toggle = ref<boolean>(false)

const user = ref<Login>({
  username: '',
  password: ''
})

const v$ = useVuelidate(rules, user)

const submit = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await store.login(user.value)
      window.location.reload()
    } catch (e) {
      throw e
    }
  }
}

// const submitForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.validate(async (valid: boolean) => {
//     if (valid) {
//       await store.login(user.value)
//     }
//   })
// }
</script>
<style lang=""></style>
