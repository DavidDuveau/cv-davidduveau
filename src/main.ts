import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { authService } from './services/authService' // Import du service d'authentification
authService.setupInterceptors()

// Import des styles
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')