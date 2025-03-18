<template>
    <div>
      child2
      <button @click="reload">刷新当前页面</button>
    </div>
</template>
<script setup lang="ts">
import { useCurrentPage } from 'packages/index'
import { onMounted } from 'vue'

const { reload } = useCurrentPage()
onMounted(() => {
  console.log('child2')
})
</script>
