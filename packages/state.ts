import { reactive } from 'vue'
export type ActionName = '' | 'push' | 'replace' | 'forward' | 'back' // 页面动作
export const cacheKey = 'v3-stack-router-114514'
let initList: string | string[] | null = sessionStorage.getItem(cacheKey)
try {
  initList = initList && typeof (initList) === 'string' ? (initList = JSON.parse(initList)) : (initList = [])
} catch (e) {
  initList = []
}
// 缓存数据
const state = reactive<{
    historyPages: string[];
    actionName: ActionName;
    transitionName: string;
    init: boolean;
}>({
  historyPages: initList as string[],
  actionName: '' as ActionName,
  transitionName: '',
  init: false
})

export default state
