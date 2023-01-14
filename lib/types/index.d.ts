import type { RouterOptions } from "vue-router";
import stackView from "./stackView.vue";
import lazyLoader from "./lazyLoader.vue";
declare const initRouter: (option: RouterOptions) => import("vue-router").Router;
export { initRouter, stackView, lazyLoader };
