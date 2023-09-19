import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
