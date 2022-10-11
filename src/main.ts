import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'

import 'virtual:windi.css'
import '@varlet/ui/es/snackbar/style/index.js'
import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')
