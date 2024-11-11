<script setup>
defineProps({
  personalInfo: {
    type: Object,
    required: true
  }
});
</script>
<template>
  <header class="bg-white rounded-lg shadow-md p-6">
    <h1 class="text-3xl font-bold text-gray-900">{{ personalInfo.name }}</h1>
    <h2 class="text-xl text-green-600 mt-2">{{ personalInfo.title }}</h2>
  <div class="mt-4 space-y-2 text-gray-600">
  <div>{{ personalInfo.location }}</div>
  <div>{{ personalInfo.phone }}</div>
  <div>{{ personalInfo.email }}</div>
  
  <div class="flex gap-4 mt-3">
    <a :href="personalInfo.github" target="_blank" class="text-green-600 hover:text-green-800">
      GitHub
    </a>
    <a :href="personalInfo.linkedin" target="_blank" class="text-green-600 hover:text-green-800">
      LinkedIn
    </a>
  </div>
</div>
</header>
</template>