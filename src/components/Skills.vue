<script setup>
defineProps({
  skills: {
    type: Array,
    required: true
  }
});
</script>
<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Compétences</h2><div class="space-y-6">
  <div v-for="(category, index) in skills" :key="index">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ category.category }}</h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(skill, skillIndex) in category.items"
        :key="skillIndex"
        class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</div>
</section>
</template>
