<template>
    <router-view v-slot="{ Component }">
        <Transition :name="transitionName">
            <keep-alive>
                <RenderView :key="currentKey" :path="$route.fullPath">
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
import { computed, provide, inject, ref, type Ref } from 'vue'
import RenderView from './renderView.vue'
import { useCurrentPage } from './index'
const props = defineProps<{
    backName?: string
    forwardName?: string
}>()
const stackParentKey = inject<Ref<string[]>>('stack-parent-key', ref([]))

const { currentKey } = useCurrentPage()
const keyList = computed(() => {
  return [...stackParentKey.value, currentKey?.value]
})
provide('stack-parent-key', keyList)
// 过渡动画
const transitionName = computed(() => {
  if (state.transitionName && state.init) {
    return state.transitionName === 'forward' ? props.forwardName : props.backName
  }
  return ''
})
</script>
