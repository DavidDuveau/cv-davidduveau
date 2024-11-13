<script setup>
import { computed } from 'vue';

const props = defineProps({
  personalInfo: {
    type: Object,
    required: true,
    validator: (obj) => {
      return ['name', 'title', 'location', 'phone', 'email'].every(prop => prop in obj);
    }
  },
  theme: {
    type: String,
    default: 'green'
  },
  showSocial: {
    type: Boolean,
    default: true
  },
  socialLinks: {
    type: Array,
    default: () => []
  }
});

const themeColor = computed(() => `text-${props.theme}-600`);

const defaultSocialLinks = computed(() => [
  { name: 'GitHub', url: props.personalInfo.github },
  { name: 'LinkedIn', url: props.personalInfo.linkedin }
]);

const allSocialLinks = computed(() => [...defaultSocialLinks.value, ...props.socialLinks]);
</script>

<template>
  <header class="bg-white rounded-lg shadow-md p-6">
    <h1 class="text-3xl font-bold text-gray-900">{{ personalInfo.name }}</h1>
    <h2 :class="['text-xl mt-2', themeColor]">{{ personalInfo.title }}</h2>
    
    <div class="mt-4 space-y-2 text-gray-600">
      <div>{{ personalInfo.location }}</div>
      <div>
        <a :href="`tel:${personalInfo.phone}`">{{ personalInfo.phone }}</a>
      </div>
      <div>
        <a :href="`mailto:${personalInfo.email}`">{{ personalInfo.email }}</a>
      </div>
      
      <div v-if="showSocial" class="flex gap-4 mt-3">
        <a 
          v-for="link in allSocialLinks"
          :key="link.name"
          :href="link.url" 
          target="_blank" 
          rel="noopener noreferrer"
          :class="[themeColor, 'hover:opacity-80']"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
  </header>
</template>