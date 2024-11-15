<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');
const showPassword = ref(false);
const loading = ref(false);

const handleSubmit = async () => {
  if (username.value.trim().length < 3) {
    error.value = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    return;
  }

  if (password.value.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const success = await authStore.login(username.value, password.value);
    
    if (success) {
      router.push('/'); // Retour à la page d'accueil après connexion
    } else {
      error.value = authStore.error;
    }
  } catch (e) {
    error.value = 'Erreur de connexion. Veuillez réessayer.';
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  router.push('/');
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <section class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Connexion</h2>
        <button 
          @click="handleCancel"
          class="text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
            Nom d'utilisateur
          </label>
          <input
            id="username"
            type="text"
            v-model="username"
            :disabled="loading"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div class="relative flex items-center">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              :disabled="loading"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Entrez votre mot de passe"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <i 
                class="fas"
                :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
          
          <button
            type="button"
            @click="handleCancel"
            class="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Annuler
          </button>
        </div>
      </form>
    </section>
  </div>
</template>