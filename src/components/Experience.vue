<script setup>
defineProps({
  experiences: {
    type: Array,
    required: true
  }
});
</script>
<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Expérience Professionnelle</h2><div class="space-y-6">
  <div v-for="(exp, index) in experiences" :key="index" class="border-l-4 border-blue-600 pl-4">
    <div class="text-sm text-gray-600">{{ exp.period }}</div>
    <div class="font-semibold text-lg">{{ exp.company }}</div>
    <div class="text-blue-600">{{ exp.position }}</div>
    <div class="text-gray-700 mt-2">{{ exp.description }}</div>
    <div v-if="exp.technologies" class="text-gray-600 mt-2 text-sm">
      {{ exp.technologies }}
    </div>
  </div>
</div>
</section>
</template>