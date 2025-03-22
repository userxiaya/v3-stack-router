import { createRouter } from 'vue-router'
import Stack from './stack'
import type { RouterOptions } from 'vue-router'
import stackView from 'packages/stackView.vue'
import lazyLoader from 'packages/lazyLoader.vue'
import { inject, provide } from 'vue'

/**
 * 初始化路由
*/
const initRouter = (option: RouterOptions) => {
  const router = createRouter(option)
  Stack(router)
  return router
}
const reloadPageKey = Symbol('reload-page')
/**
 * 重新加载页面provide
*/
export const provideReloadPage = (fn:() => void) => {
  provide(reloadPageKey, fn)
}
/**
 * 重新加载页面inject
*/
export const injectReloadPage = () => {
  return inject(reloadPageKey, () => {
    console.warn('获取刷新方法失败，请检查')
  })
}
/**
 * 当前页面的数据
*/
const useCurrentPage = () => {
  const reload = injectReloadPage()
  return {
    /**
     * 重新加载当前页面
    */
    reload
  }
}
export { initRouter, useCurrentPage, stackView, lazyLoader }
