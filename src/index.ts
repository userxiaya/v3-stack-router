import { createRouter } from "vue-router"
import Stack from "./stack"
import type { RouterOptions } from "vue-router"
import stackView from "./stackView.vue"
import lazyLoader from "./lazyLoader.vue"

const initRouter = (option: RouterOptions) => {
    const router = createRouter(option)
    Stack(router)
    return router
}
export { initRouter, stackView, lazyLoader }

