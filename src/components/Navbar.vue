<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { BrickWall, Notebook } from 'lucide-vue-next';

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isGitHubPages = computed(() => window.location.hostname.includes('github.io'))

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const handleLogin = () => {
  router.push('/login')
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/" class="text-green-600 hover:text-green-600 flex items-center space-x-2">
            <Notebook class="w-6 h-6 text-green-600" />
            <span>CV Duveau</span>
          </router-link>
          <router-link 
            v-if="!isGitHubPages"
            to="/materials" 
            class="text-gray-600 hover:text-green-600 flex items-center space-x-2"
          >
            <BrickWall class="w-6 h-6 text-green-600" />
            <span>Materials</span>
          </router-link>
        </div>
        
        <div v-if="!isGitHubPages" class="flex items-center">
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