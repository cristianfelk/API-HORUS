import { createRouter, createWebHistory } from 'vue-router'
import HomeLogin from '@/views/HomeLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLogin
    }
  ]
})

export default router
