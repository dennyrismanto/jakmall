import { createRouter, createWebHistory } from 'vue-router'
import DeliveryView from '../views/DeliveryView.vue'
import PaymentView from '../views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/delivery',
      name: 'delivery',
      component: DeliveryView
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView
    },
    {
      path: '/finish',
      name: 'finish'
    }
  ]
})

export default router
