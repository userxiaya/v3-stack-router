<template>
    <router-view v-slot="{ Component, route }">
        <Transition :name="transitionName">
            <keep-alive>
                <RenderView :key="getKey(route)" :path="$route.fullPath">
                    <slot :Component="Component">
                        <component :is="Component" />
                    </slot>
                </RenderView>
            </keep-alive>
        </Transition>
    </router-view>
</template>
<script lang="ts" setup>
import state from './state'
import { computed } from 'vue'
import RenderView from './renderView.vue'
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { getRouteLevel, setRouteLevel } from './provide'
import { match, compile } from 'path-to-regexp'

const props = defineProps<{
    backName?: string;
    forwardName?: string;
}>()
const level = getRouteLevel()
setRouteLevel(level + 1) // 记录嵌套层级
/**
 * 根据嵌套层级获取对应的key
*/
const getKey = (route: RouteLocationNormalizedLoadedGeneric) => {
  const currentLevel = level ?? 0
  const obj = route.matched?.[currentLevel]
  if (obj && level !== undefined) {
    const matchFn = match(`${obj.path}/*splat`)
    const data = matchFn(route.fullPath) as any
    if (data) {
      const toPath = compile(obj.path)
      return toPath(data?.params)
    }
  }
  return route.fullPath
}
// 过渡动画
const transitionName = computed(() => {
  if (state.transitionName && state.init) {
    return state.transitionName === 'forward' ? props.forwardName : props.backName
  }
  return ''
})
</script>
