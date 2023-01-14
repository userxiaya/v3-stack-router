export type ActionName = "" | "push" | "replace" | "forward" | "back";
export declare const cacheKey = "v3-stack-router-114514";
declare const state: {
    historyPages: string[];
    actionName: ActionName;
    transitionName: string;
    init: boolean;
};
export default state;
