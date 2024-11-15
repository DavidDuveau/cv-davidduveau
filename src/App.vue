<script setup>
import Navbar from './components/Navbar.vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <div class="pt-16 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <router-view />
    </div>
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>