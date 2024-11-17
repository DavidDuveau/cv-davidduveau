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
  // Ajout d'une route catch-all pour la gestion 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/cv-davidduveau/'),
  routes
})

export default router