<script setup>
defineProps({
  description: {
    type: String,
    required: true
  }
});
</script>
<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Profil</h2>
    <p class="text-gray-700">{{ description }}</p>
  </section>
</template>