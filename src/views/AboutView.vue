<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click="next">about2</h1>
    <button @click="toParent">parent</button>
    <button @click="reload">刷新当前页面</button>
  </div>
</template>

<style></style>
<script lang="ts" setup>
import { useCurrentPage } from 'packages'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))
await sleep(1000)
const { reload } = useCurrentPage()
const router = useRouter()
const route = useRoute()
const next = () => {
  router.push({
    name: 'about',
    params: {
      id: 2
    }
  })
}
const toParent = () => {
  router.push({
    name: 'parent',
    params: {
      id: 2015
    }
  })
}
onMounted(() => {
  console.log(route.params)
})
</script>
