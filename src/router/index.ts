import { createWebHashHistory } from 'vue-router'
import { initRouter } from 'packages'

const router = initRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about/:id',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      redirect: { name: 'detail' },
      meta: {
        hasChildren: true // 是否
      },
      children: [
        {
          path: 'detail',
          name: 'detail',
          component: () => import('../views/home/detail.vue')
        },
        {
          path: 'des',
          name: 'des',
          component: () => import('../views/home/des.vue')
        }
      ]
    }
  ]
})

export default router
