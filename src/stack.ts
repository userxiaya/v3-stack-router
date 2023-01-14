import type { Router, RouteRecordRaw } from 'vue-router'
import type { ActionName } from './state'
import state, { cacheKey } from './state'

class Stack {
    setActionName = (name: ActionName) => {
        state.actionName = name
    }
    setHistoryPage = (list: string[]) => {
        sessionStorage.setItem(cacheKey, JSON.stringify(list))
    }
    addHistory = (value: string) => {
        const itemIndex = function () {
            for (let i = state.historyPages.length - 1; i >= 0; i--) {
                if (state.historyPages[i] == value) {
                    return i
                }
            }
            return -1
        }()

        // 若是替换动作，必定是前进
        if (state.actionName === "replace") {
            const lastIndex = state.historyPages.length - 1
            state.historyPages.fill(value, lastIndex)
            state.transitionName = "forward" // 前进动画
            state.actionName = ""
            this.setHistoryPage(state.historyPages)
            return
        }

        if (itemIndex > -1) {
            if (state.actionName === "push") {
                state.historyPages.push(value)
                state.transitionName = "forward" //前进动画
            } else {
                if (state.historyPages.length > 1) {
                    const i = itemIndex + 1,
                        n = state.historyPages.length - i
                    state.historyPages.splice(i, n) // 从i位置开始删除后面所有元素(包括i)
                }
                state.transitionName = "back" //后退动画
            }
        } else {
            state.historyPages.push(value)
            if (state.historyPages.length > 1) {
                state.transitionName = "forward" // 前进动画
            }
        }
        state.actionName = ""
        this.setHistoryPage(state.historyPages)
    }
    constructor(router: Router) {
        const {
            push: routerPush,
            replace: routerReplace,
            go: routerGo,
            forward: routerForward,
            back: routerBack
        } = router
        const { setActionName, addHistory } = this
        // 添加
        router.push = (to: RouteRecordRaw) => {
            setActionName("push")
            return routerPush(to)
        }
        // 替换
        router.replace = (to: RouteRecordRaw) => {
            setActionName("replace")
            return routerReplace(to)
        }
        // 前进后退
        router.go = (delta: number) => {
            if (delta > 0) {
                setActionName("forward") // 保留动作，暂无作用
            }
            if (delta < 0) {
                setActionName("back") // 保留动作，暂无作用
            }
            routerGo(delta)
        }
        // 前进
        router.forward = () => {
            setActionName("forward")
            routerForward()
        }
        // 后退
        router.back = () => {
            setActionName("back")
            routerBack()
        }

        router.afterEach((to) => {
            addHistory(to.fullPath)
        })
    }
}
export default (router: Router) => {
    new Stack(router)
}
