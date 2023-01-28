import { createRouter, useRoute } from 'vue-router'
import Stack from './stack'
import type { RouterOptions } from 'vue-router'
import stackView from './stackView.vue'
import lazyLoader from './lazyLoader.vue'
import { inject } from 'vue'

const initRouter = (option: RouterOptions) => {
  const router = createRouter(option)
  Stack(router)
  return router
}
const useCurrentPage = () => {
  const route = useRoute()
  const reload = inject(`${route.fullPath}-reload`, () => {
    console.warn('获取刷新方法失败，请检查')
  })
  return { reload }
}
export { initRouter, useCurrentPage, stackView, lazyLoader }
