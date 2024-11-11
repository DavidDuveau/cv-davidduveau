<script setup>
defineProps({
  education: {
    type: Array,
    required: true
  }
});
</script>
<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Formation</h2>
    <div class="space-y-6">
      <div v-for="(edu, index) in education" :key="index" class="border-l-4 border-green-500 pl-4">
      <div class="text-sm text-gray-600">{{ edu.year }}</div>
      <div class="font-semibold text-lg text-gray-400">{{ edu.school }}</div>
      <div class="text-green-600">{{ edu.diploma }}</div>
      <div class="text-gray-700 mt-2">{{ edu.details }}</div>
    </div>
</div>
</section>
</template>