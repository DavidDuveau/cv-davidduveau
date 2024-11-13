<script setup>
import { computed } from 'vue';

const props = defineProps({
  experiences: {
    type: Array,
    required: true
  },
  titleText: {
    type: String,
    default: 'Expérience Professionnelle'
  },
  borderColor: {
    type: String,
    default: 'green'
  },
  showTechnologies: {
    type: Boolean,
    default: true
  }
});

const borderColorClass = computed(() => `border-${props.borderColor}-500`);

// Émets un événement quand une expérience est cliquée
const emit = defineEmits(['experience-click']);

const handleExperienceClick = (experience) => {
  emit('experience-click', experience);
};
</script>

<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ titleText }}</h2>
    <div class="space-y-6">
      <div 
        v-for="(exp, index) in experiences" 
        :key="index"
        @click="handleExperienceClick(exp)"
        class="pl-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        :class="['border-l-4', borderColorClass]"
      >
        <div class="flex justify-between items-start">
          <div class="flex-grow">
            <div class="text-sm text-gray-600">{{ exp.period }}</div>
            <div class="font-semibold text-lg text-gray-400">{{ exp.company }}</div>
            <div :class="`text-${borderColor}-600`">{{ exp.position }}</div>
            <div v-if="exp.description" class="text-gray-700 mt-2">{{ exp.description }}</div>
            <div 
              v-if="showTechnologies && exp.technologies" 
              class="text-gray-600 mt-2 text-sm"
            >
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in exp.technologies.split('-')" 
                  :key="tech"
                  class="bg-gray-100 px-2 py-1 rounded-full"
                >
                  {{ tech.trim() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>