import { createRouter, useRoute } from 'vue-router'
import Stack from './stack'
import type { RouterOptions } from 'vue-router'
import stackView from 'packages/stackView.vue'
import lazyLoader from 'packages/lazyLoader.vue'
import { inject } from 'vue'

/**
 * 初始化路由
*/
const initRouter = (option: RouterOptions) => {
  const router = createRouter(option)
  Stack(router)
  return router
}
/**
 * 当前页面的数据
*/
const useCurrentPage = () => {
  const route = useRoute()
  const reload = inject(`${route.fullPath}-reload`, () => {
    console.warn('获取刷新方法失败，请检查')
  })
  return {
    /**
     * 重新加载当前页面
    */
    reload
  }
}
export { initRouter, useCurrentPage, stackView, lazyLoader }
