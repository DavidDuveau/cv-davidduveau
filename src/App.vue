<script setup>
import { RouterView, RouterLink } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { Database } from 'lucide-vue-next';

// Si vous utilisez des styles spécifiques de Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <Navbar />
    <main class="pt-16 px-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>