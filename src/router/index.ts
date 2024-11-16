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
  history: createWebHistory(),
  routes
})

export default router