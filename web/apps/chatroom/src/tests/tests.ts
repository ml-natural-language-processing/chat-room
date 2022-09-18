import {createApp} from 'vue'
import { defineComponent } from 'vue'
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp({
    data() {
        return {
            count: 0
        }
    }
})

app.use(ElementPlus, {size: 'small', zIndex: 3000})
app.mount('#app')

// @ts-ignore

const app2 = createApp(App)
app2.use(ElementPlus, {
    size: 'small',
    zIndex: 3000,
    locale: zhCn,
})
app2.mount('#app2')
