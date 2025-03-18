<template>
    <div>child2</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('child2')
})
</script>
