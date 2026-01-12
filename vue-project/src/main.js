import { createApp } from 'vue'
import App from './views/App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@/assets/custom.css'

import router from './router'

createApp(App).use(router).mount('#app')
