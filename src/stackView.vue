<template>
    <router-view v-slot="{ Component }">
        <Transition :name="transitionName">
            <keep-alive>
                <RenderView :key="$route.fullPath" :path="$route.fullPath">
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
import { computed } from 'vue';
import RenderView from './renderView.vue';

const props = defineProps<{
    backName?: string;
    forwardName?: string;
}>()
// 过渡动画
const transitionName = computed(() => {
    if (state.transitionName) {
        return state.transitionName === 'forward' ? props.forwardName : props.backName
    }
    return ''
})
</script>