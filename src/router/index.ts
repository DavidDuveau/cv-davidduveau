import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/views/Home.vue'
import MaterialsExplorer from '@/components/MaterialsExplorer.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/materials',
    name: 'Materials',
    component: MaterialsExplorer
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/cv-davidduveau/'),
  routes
})

// Navigation guard pour gérer les redirections
router.beforeEach((to, from, next) => {
  // Si la route n'existe pas, rediriger vers la home
  if (!to.matched.length) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router