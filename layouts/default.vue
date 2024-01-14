<script setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '@/store/auth'; // import the auth store we just created

const router = useRouter();


const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>


<template>
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <NuxtLink to="/" class="text-white font-bold text-xl">MSIB App</NuxtLink>
              </div>
            </div>
            <div class="flex items-center">
              
              <div class="ml-4">
                <button @click="logout" class="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
  
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot/>
      </div>
    </div>
  </template>