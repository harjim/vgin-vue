import BasicLayout from '@/views/BasicLayout.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Home',
    component: BasicLayout
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
