import { reactive } from 'vue'

export default {
    // `setup` 是一个专门用于组合式 API 的特殊钩子函数
    setup() {
        const state = reactive({ count: 0 })

        // 暴露 state 到模板
        return {
            state
        }
    },
    template: `<div>{{ state.count }}</div>`
}