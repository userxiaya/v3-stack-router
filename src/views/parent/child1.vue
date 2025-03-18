<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  console.log('child1')
})
const next = () => {
  router.push({
    name: 'child2'
  })
}
</script>

<template>
  <div @click="next" style="width: 100%; height: 100%;">111</div>
</template>
