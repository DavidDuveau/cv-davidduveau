<script setup>
defineProps({
  interests: {
    type: Array,
    required: true
  }
});
</script>
<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Centres d'Intérêts</h2><div class="flex flex-wrap gap-2">
  <span
    v-for="(interest, index) in interests"
    :key="index"
    class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
  >
    {{ interest }}
  </span>
</div>
</section>
</template>