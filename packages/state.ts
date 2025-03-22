import { reactive } from 'vue'
/**
 * 页面动作类型
*/
export type ActionName = '' | 'push' | 'replace' | 'forward' | 'back'
export const cacheKey = 'v3-stack-router-cache-key'
let initList: string | string[] | null = sessionStorage.getItem(cacheKey)
try {
  initList = initList && typeof (initList) === 'string' ? (initList = JSON.parse(initList)) : (initList = [])
} catch (e) {
  initList = []
}
/**
 * 路由缓存数据
*/
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
