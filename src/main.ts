import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'

import 'virtual:windi.css'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')
