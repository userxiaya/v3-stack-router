<script setup lang="ts">
import { lazyLoader, stackView } from 'packages/index'
</script>

<template>
  <stackView v-slot="{ Component }" backName="slide-right" forwardName="slide-left">
    <lazyLoader>
      <template v-slot:loading>
        加载插槽位
      </template>
      <template v-slot:error="{ error }">
        错误插槽位{{ error?.message }}
      </template>
      <template v-slot:default>
        <component :is="Component"/>
      </template>
    </lazyLoader>
  </stackView>
</template>

<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: transform 300ms;
  position: absolute;
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
