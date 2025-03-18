import { provide, inject } from 'vue'

/**
 * 路由层级key
*/
const key = Symbol('route-level')
/**
 * 设置路由层级
*/
export const setRouteLevel = (level: number) => {
  provide(key, level)
}

export const getRouteLevel = () => {
  return inject<number>(key, 0)
}
