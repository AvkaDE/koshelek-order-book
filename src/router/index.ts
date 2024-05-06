import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/order-book',
      name: 'order-book',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
