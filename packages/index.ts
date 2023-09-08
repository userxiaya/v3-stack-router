import { createRouter, useRoute } from 'vue-router'
import Stack from './stack'
import type { RouterOptions } from 'vue-router'
import stackView from 'packages/stackView.vue'
import lazyLoader from 'packages/lazyLoader.vue'
import { computed, inject, ref, type Ref } from 'vue'

const initRouter = (option: RouterOptions) => {
  const router = createRouter(option)
  Stack(router)
  return router
}
const useCurrentPage = () => {
  const route = useRoute()
  const stackParentKey = inject<Ref<string[]>>('stack-parent-key', ref([]))
  const getKey = (fullPath: string) => {
    let list = stackParentKey.value
    if (list.length === 0) {
      list = route?.matched.map(e => e.path).filter((_, index) => index === 0)
    } else {
      const dealList = (route?.matched ?? []).map(e => e.path)
      const pCount = (list?.[list.length - 1]?.match(/\//g) || []).length
      dealList.forEach((paths, index) => {
        const currentCount = (paths.match(/\//g) || []).length
        if (currentCount === pCount) {
          list = [route?.matched?.[index + 1].path]
        }
      })
    }
    const count = (list?.[list.length - 1]?.match(/\//g) || []).length
    return fullPath.split('/').filter((_, index) => index <= count).join('/')
  }
  const currentKey = computed(() => getKey(route.fullPath))
  const reload = inject('stack-reload', () => {
    console.warn('获取刷新方法失败，请检查', currentKey.value)
  })
  return { reload, currentKey }
}
export { initRouter, useCurrentPage, stackView, lazyLoader }
