<script setup>
import { computed } from 'vue';

const props = defineProps({
  education: {
    type: Array,
    required: true
  },
  titleText: {
    type: String,
    default: 'Formation'
  },
  borderColor: {
    type: String,
    default: 'green'
  }
});

const borderColorClass = computed(() => `border-${props.borderColor}-500`);
</script>

<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ titleText }}</h2>
    <div class="space-y-6">
      <div 
        v-for="(edu, index) in education" 
        :key="index" 
        class="pl-4"
        :class="['border-l-4', borderColorClass]"
      >
        <div class="flex justify-between items-start">
          <div class="flex-grow">
            <div class="text-sm text-gray-600">{{ edu.year }}</div>
            <div class="font-semibold text-lg text-gray-400">{{ edu.school }}</div>
            <div :class="`text-${borderColor}-600`">{{ edu.diploma }}</div>
            <div v-if="edu.details" class="text-gray-700 mt-2">{{ edu.details }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>