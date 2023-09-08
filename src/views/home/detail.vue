<template>
    <div @click.stop="next()">
        detail
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  console.log('mounted', 'detail')
})
const next = () => {
  router.push({
    name: 'des'
  })
}
</script>
