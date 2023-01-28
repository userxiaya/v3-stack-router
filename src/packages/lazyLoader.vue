<template>
    <Suspense v-if="show">
        <template v-if="isError">
            <slot name="error" :message="message" :reload="reload">
                页面加载失败
            </slot>
        </template>
        <template v-else>
            <slot :reload="reload" />
        </template>
        <template #fallback>
            <slot name="loading">加载中</slot>
        </template>
    </Suspense>
</template>
<script lang="ts" setup>
import { nextTick, onErrorCaptured, ref } from 'vue'

const show = ref(true)
const isError = ref(false)
const message = ref('')
onErrorCaptured((error) => {
  message.value = error.message
  isError.value = true
  return false
})
const reload = () => {
  isError.value = false
  show.value = false
  nextTick(() => {
    show.value = true
  })
}
</script>
