import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/styles.scss'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
