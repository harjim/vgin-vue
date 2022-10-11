import { RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/system/LoginPage.vue'

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: LoginPage
}
