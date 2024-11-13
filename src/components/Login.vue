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
      router.push('/'); // Rediriger vers la page d'accueil après connexion
    } else {
      error.value = authStore.error;
    }
  } catch (e) {
    error.value = 'Erreur de connexion. Veuillez réessayer.';
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <section class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-4">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Connexion</h2>
      
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

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>
    </section>
  </div>
</template>