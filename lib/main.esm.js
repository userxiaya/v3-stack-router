import { createRouter } from 'vue-router';
import { reactive, defineComponent, computed, unref, openBlock, createElementBlock, renderSlot, createCommentVNode, resolveComponent, createBlock, withCtx, createVNode, Transition, KeepAlive, resolveDynamicComponent, ref, onErrorCaptured, Suspense, createTextVNode, nextTick } from 'vue';

var cacheKey = 'v3-stack-router-114514';
var initList = sessionStorage.getItem(cacheKey);
try {
    initList = initList ? (initList = JSON.parse(initList)) : (initList = []);
}
catch (e) {
    initList = [];
}
// 缓存数据
var state = reactive({
    historyPages: initList,
    actionName: "",
    transitionName: "",
    init: false
});

var Stack = /** @class */ (function () {
    function Stack(router) {
        var _this = this;
        this.setActionName = function (name) {
            state.actionName = name;
        };
        this.setHistoryPage = function (list) {
            sessionStorage.setItem(cacheKey, JSON.stringify(list));
        };
        this.addHistory = function (value) {
            var itemIndex = function () {
                for (var i = state.historyPages.length - 1; i >= 0; i--) {
                    if (state.historyPages[i] == value) {
                        return i;
                    }
                }
                return -1;
            }();
            // 若是替换动作，必定是前进
            if (state.actionName === "replace") {
                var lastIndex = state.historyPages.length - 1;
                state.historyPages.fill(value, lastIndex);
                state.transitionName = "forward"; // 前进动画
                state.actionName = "";
                _this.setHistoryPage(state.historyPages);
                return;
            }
            if (itemIndex > -1) {
                if (state.actionName === "push") {
                    state.historyPages.push(value);
                    state.transitionName = "forward"; //前进动画
                }
                else {
                    if (state.historyPages.length > 1) {
                        var i = itemIndex + 1, n = state.historyPages.length - i;
                        state.historyPages.splice(i, n); // 从i位置开始删除后面所有元素(包括i)
                    }
                    state.transitionName = "back"; //后退动画
                }
            }
            else {
                state.historyPages.push(value);
                if (state.historyPages.length > 1) {
                    state.transitionName = "forward"; // 前进动画
                }
            }
            state.actionName = "";
            _this.setHistoryPage(state.historyPages);
        };
        var routerPush = router.push, routerReplace = router.replace, routerGo = router.go, routerForward = router.forward, routerBack = router.back;
        var _a = this, setActionName = _a.setActionName, addHistory = _a.addHistory;
        // 添加
        router.push = function (to) {
            setActionName("push");
            return routerPush(to);
        };
        // 替换
        router.replace = function (to) {
            setActionName("replace");
            return routerReplace(to);
        };
        // 前进后退
        router.go = function (delta) {
            if (delta > 0) {
                setActionName("forward"); // 保留动作，暂无作用
            }
            if (delta < 0) {
                setActionName("back"); // 保留动作，暂无作用
            }
            routerGo(delta);
        };
        // 前进
        router.forward = function () {
            setActionName("forward");
            routerForward();
        };
        // 后退
        router.back = function () {
            setActionName("back");
            routerBack();
        };
        router.afterEach(function (to) {
            addHistory(to.fullPath);
        });
    }
    return Stack;
}());
var Stack$1 = (function (router) {
    new Stack(router);
});

var _hoisted_1 = {
    key: 0,
    class: "stack-router-content"
};
var script$2 = /*#__PURE__*/ defineComponent({
    __name: 'renderView',
    props: {
        path: { type: String, required: true }
    },
    setup: function (__props) {
        var props = __props;
        // 判断是否渲染
        var show = computed(function () {
            return state.historyPages.indexOf(props.path) > -1;
        });
        return function (_ctx, _cache) {
            return (unref(show))
                ? (openBlock(), createElementBlock("div", _hoisted_1, [
                    renderSlot(_ctx.$slots, "default")
                ]))
                : createCommentVNode("v-if", true);
        };
    }
});

script$2.__file = "src/renderView.vue";

var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'stackView',
    props: {
        backName: { type: String, required: false },
        forwardName: { type: String, required: false }
    },
    setup: function (__props) {
        var props = __props;
        // 过渡动画
        var transitionName = computed(function () {
            if (state.transitionName) {
                return state.transitionName === 'forward' ? props.forwardName : props.backName;
            }
            return '';
        });
        return function (_ctx, _cache) {
            var _component_router_view = resolveComponent("router-view");
            return (openBlock(), createBlock(_component_router_view, null, {
                default: withCtx(function (_a) {
                    var Component = _a.Component;
                    return [
                        createVNode(Transition, { name: unref(transitionName) }, {
                            default: withCtx(function () { return [
                                (openBlock(), createBlock(KeepAlive, null, [
                                    (openBlock(), createBlock(script$2, {
                                        key: _ctx.$route.fullPath,
                                        path: _ctx.$route.fullPath
                                    }, {
                                        default: withCtx(function () { return [
                                            renderSlot(_ctx.$slots, "default", { Component: Component }, function () { return [
                                                (openBlock(), createBlock(resolveDynamicComponent(Component)))
                                            ]; })
                                        ]; }),
                                        _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["path"]))
                                ], 1024 /* DYNAMIC_SLOTS */))
                            ]; }),
                            _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name"])
                    ];
                }),
                _: 3 /* FORWARDED */
            }));
        };
    }
});

script$1.__file = "src/stackView.vue";

var script = /*#__PURE__*/ defineComponent({
    __name: 'lazyLoader',
    setup: function (__props) {
        var show = ref(true);
        var isError = ref(false);
        var message = ref('');
        onErrorCaptured(function (error) {
            message.value = error.message;
            isError.value = true;
            return false;
        });
        var reload = function () {
            isError.value = false;
            show.value = false;
            nextTick(function () {
                show.value = true;
            });
        };
        return function (_ctx, _cache) {
            return (show.value)
                ? (openBlock(), createBlock(Suspense, { key: 0 }, {
                    fallback: withCtx(function () { return [
                        renderSlot(_ctx.$slots, "loading", {}, function () { return [
                            createTextVNode("加载中")
                        ]; })
                    ]; }),
                    default: withCtx(function () { return [
                        (isError.value)
                            ? renderSlot(_ctx.$slots, "error", {
                                key: 0,
                                message: message.value,
                                reload: reload
                            }, function () { return [
                                createTextVNode(" 页面加载失败 ")
                            ]; })
                            : renderSlot(_ctx.$slots, "default", {
                                key: 1,
                                reload: reload
                            })
                    ]; }),
                    _: 3 /* FORWARDED */
                }))
                : createCommentVNode("v-if", true);
        };
    }
});

script.__file = "src/lazyLoader.vue";

var initRouter = function (option) {
    var router = createRouter(option);
    Stack$1(router);
    return router;
};

export { initRouter, script as lazyLoader, script$1 as stackView };
