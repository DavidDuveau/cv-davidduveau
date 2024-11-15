<script setup>
import { useResumeStore } from '../stores/resumeStore'
import Header from './Header.vue'
import Profile from './Profile.vue'
import Experience from './Experience.vue'
import Skills from './Skills.vue'
import Education from './Education.vue'
import Interests from './Interests.vue'

const resumeStore = useResumeStore()
</script>

<template>
  <div class="grid gap-6 mt-4">
    <Header :personal-info="resumeStore.personalInfo" />
    <Profile :description="resumeStore.personalInfo.profile" />
    <Experience :experiences="resumeStore.experience" />
    <Skills :skills="resumeStore.skills" />
    <Education :education="resumeStore.education" />
    <Interests :interests="resumeStore.interests" />
  </div>
</template>