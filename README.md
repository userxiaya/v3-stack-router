# v3-stack-router
效果演示：前进后退动画、前进刷新后退缓存

## 特性
- 支持vue3
- 支持TypeScript
- 前进后退动画
- 前进刷新后退缓存
- setup组件异步加载loading（可自定义加载中页面和加载失败页面）
- 刷新当前页面
- 兼容路由嵌套 (v2.0.4 版本兼容)

## 插件安装
```bash
# 目前仅支持vue3项目
npm i v3-stack-router
```

## 问题描述
目前vue3 keep-alive组件只能通过name属性值动态缓存组件 那么使用同一个组件的两个页面页面就无法动态缓存 如：（about/1 和 about/2 同使用about组件 页面参数不一样）

#### 解决
在keep-alive里再包一个组件使用插槽传入vue-router的fullPath参数然后在插槽组件里判断是否需要缓存


## 使用
```js
// 在 router.js 中引用
import { initRouter } from 'v3-stack-router'

const router = initRouter({
  history: createWebHashHistory(), // 建议使用hash路由模式
  routes
})

export default router
```


```html
<!-- App.vue -->
<template>
  <stackView v-slot="{ Component }" backName="slide-right" forwardName="slide-left">
    <lazyLoader>
      <component :is="Component"/>
    </lazyLoader>
  </stackView>
</template>

<script setup lang="ts">
import { lazyLoader, stackView } from 'v3-stack-router'
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: transform 300ms;
  position: fixed;
  pointer-events: none;
}

.slide-right-enter-from {
  z-index: 1;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  transition-delay: 35ms;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter-from {
  z-index: 1;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  transition-delay: 35ms;
  transform: translate3d(-100%, 0, 0);
}
</style>
```

```html
<!-- about.vue -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="reload">刷新当前页面</button>
  </div>
</template>

<style>

</style>
<script lang="ts" setup>
  
import { onMounted } from 'vue';
import { useCurrentPage } from 'v3-stack-router'
const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))
await sleep(1000)
const { reload } = useCurrentPage
onMounted(() => {  
  console.log('about');
})
</script>
```



## 路由嵌套子路由配置demo

```js
// 在 router.js 中引用
import { initRouter } from 'v3-stack-router'

const router = initRouter({
  history: createWebHashHistory(), // 建议使用hash路由模式
  routes: [
     {
      path: '/parent/:id',
      name: 'parent',
      component: () => import('../views/parent/index.vue'),
      redirect: to => {
        // 子路由重定向
        return (to.path.endsWith('/') ? to.path : `${to.path}/`).replace(/$/, 'child1')
      },
      children: [
        {
          path: 'child1',
          name: 'child1',
          component: () => import('../views/parent/child1.vue')
        },
        {
          path: 'child2',
          name: 'child2',
          component: () => import('../views/parent/child2.vue')
        }
      ]
    }
  ]
})

export default router
```
## html同上App.vue

如有问题请留言，感谢支持！

### [Demo地址](https://github.com/userxiaya/v3-stack-demo)
