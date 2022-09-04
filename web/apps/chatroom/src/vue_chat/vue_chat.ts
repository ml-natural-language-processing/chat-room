import {createApp, defineComponent, render,} from 'vue'
import App from './App.vue'
// import Chat from './chat.vue'
import ElementPlus from 'element-plus'
import 'element-plus/es/components/message/style/css'
import {ElMessage} from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// @ts-ignore
const app2 = createApp(App)
app2.use(ElementPlus, {
    size: 'small',
    zIndex: 3000,
    locale: zhCn,
})
app2.mount('#app2')
