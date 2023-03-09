import '@/assets/styles/index.scss'
import {createApp} from 'vue'
import store from './store'
import App from './App.vue'
import {router} from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
