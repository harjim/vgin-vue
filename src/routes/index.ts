import BasicLayout from '@/views/BasicLayout.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { LoginRoute } from './basic'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Home',
    component: BasicLayout
  },
  LoginRoute
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    const token = useStorage('APP_TOKEN', null)
    if (token.value) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
