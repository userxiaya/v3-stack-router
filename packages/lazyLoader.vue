<template>
  <Suspense v-if="show">
    <template v-if="isError">
      <slot name="error" :error="error">
        页面加载失败
      </slot>
    </template>
    <template v-else>
      <slot />
    </template>
    <template #fallback>
      <slot name="loading">加载中</slot>
    </template>
  </Suspense>
</template>
<script lang="ts" setup>
import { nextTick, onErrorCaptured, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const show = ref(true)
const isError = ref(false)
/** 错误信息 */
const error = ref<Error>()
onErrorCaptured((err: Error) => {
  error.value = err
  isError.value = true
  return false
})
/**
 * 重新加载
*/
const reload = () => {
  isError.value = false
  show.value = false
  nextTick(() => {
    show.value = true
  })
}
provide(`${route.fullPath}-reload`, reload)
</script>
