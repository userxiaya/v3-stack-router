<template>
    <div class="stack-router-content" v-if="show">
        <slot />
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import state from './state';

const props = defineProps<{
    path: string
}>()
// 判断是否渲染
const show = computed(() => {
    return state.historyPages.indexOf(props.path) > -1
})
</script>