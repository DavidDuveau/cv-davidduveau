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
  },
  // Route catch-all qui redirige vers Home
  { 
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const BASE_URL = '/cv-davidduveau/'

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
})

// Garde de navigation pour conserver l'URL
router.beforeEach((to, from, next) => {
  // Si l'URL ne commence pas par la base URL, ajoutez-la
  if (!to.fullPath.startsWith(BASE_URL)) {
    const newPath = BASE_URL + to.fullPath.substring(1)
    next(newPath)
    return
  }
  next()
})

export default router