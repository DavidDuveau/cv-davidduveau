<!-- src/components/Navbar.vue -->
<script setup>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

const handleLogin = () => {
  router.push('/login');
};
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-green-600">
              CV David Duveau
            </router-link>
          </div>
        </div>
        
        <div class="flex items-center">
          <template v-if="isAuthenticated">
            <button
              @click="handleLogout"
              class="ml-4 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Se déconnecter
            </button>
          </template>
          <template v-else>
            <button
              @click="handleLogin"
              class="ml-4 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md text-sm font-medium"
            >
              Se connecter
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>