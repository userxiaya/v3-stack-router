<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click="next">about2</h1>
    <button @click="reload">刷新当前页面</button>
    <div class="container">
      <stackView v-slot="{ Component }" backName="slide-right" forwardName="slide-left">
        <lazyLoader>
          <template v-slot:default>
            <component :is="Component" />
          </template>
        </lazyLoader>
      </stackView>
    </div>
  </div>
</template>

<style></style>
<script lang="ts" setup>
import { lazyLoader, stackView } from 'packages/index'
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
onMounted(() => {
  console.log(route.params)
})
</script>
<style scoped>
.about {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .container {
    width: 100%;
    flex-grow: 1;
    background-color: aqua;
  }
}
</style>
