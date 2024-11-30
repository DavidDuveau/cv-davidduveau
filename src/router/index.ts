import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/views/Home.vue'
import MaterialsExplorer from '@/components/MaterialsExplorer.vue'

const isGitHubPages = window.location.hostname.includes('github.io')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isGitHubPages) {
        next('/') // Redirection vers le CV sur GitHub Pages
      } else {
        next() // Continue normalement en développement
      }
    }
  },
  {
    path: '/materials',
    name: 'Materials',
    component: MaterialsExplorer,
    beforeEnter: (to, from, next) => {
      if (isGitHubPages) {
        next('/') // Redirection vers le CV sur GitHub Pages
      } else {
        next() // Continue normalement en développement
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router