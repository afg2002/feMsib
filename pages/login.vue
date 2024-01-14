<script setup>

definePageMeta({
    layout: false,
})
import {storeToRefs} from 'pinia'
import {useAuthStore} from '@/store/auth'


const  authStore = useAuthStore()
const {authenticatedUser} = useAuthStore()
const {auth} = storeToRefs(authStore)

const user = ref({
    username: '',
    password: '',
})

const router = useRouter()

const login = async () => {
    
    await authenticatedUser(user.value.username, user.value.password)
    console.log(auth.value)
    if (auth.value) {
        router.push('/')
    }
}

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">MSIB Project</h2>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="username" class="block mb-1">Username</label>
            <input v-model="user.username" type="text" id="username" class="w-full px-4 py-2 border rounded" />
          </div>
          <div>
            <label for="password" class="block mb-1">Password</label>
            <input v-model="user.password" type="password" id="password" class="w-full px-4 py-2 border rounded" />
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  