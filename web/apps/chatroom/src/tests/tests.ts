import { createApp } from 'vue'
import App from './App.vue';

const app = createApp({
    data() {
        return {
            count: 0
        }
    }
})

app.mount('#app')

// @ts-ignore
createApp(App).mount('#app2')