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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/parent/:id',
      name: 'parent',
      component: () => import('../views/parent/index.vue'),
      redirect: to => {
        // 子路由重定向
        return (to.path.endsWith('/') ? to.path : `${to.path}/`).replace(/$/, 'child1')
      },
      children: [
        {
          path: 'child1',
          name: 'child1',
          component: () => import('../views/parent/child1.vue')
        },
        {
          path: 'child2',
          name: 'child2',
          component: () => import('../views/parent/child2.vue')
        }
      ]
    }
  ]
})

export default router
