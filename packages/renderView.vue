<template>
    <div class="stack-router-content" v-if="show">
        <slot />
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import state from './state'

const props = defineProps<{
    path: string
}>()
// 判断是否渲染
const show = computed(() => {
  const list = state.historyPages
  return list.indexOf(props.path) > -1
})
</script>
<style>
.stack-router-content {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
