import {createApp, defineComponent} from 'vue'
import App from './App.vue'
import '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
// import {ElMessage} from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus, {
    size: 'small',
    zIndex: 3000,
    // locale: zhCn,
})
app.mount('#app')
