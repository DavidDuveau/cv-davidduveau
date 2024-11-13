// src/main.ts
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './router'
import { authService } from './services/authService' // Import du service d'authentification

// Configuration d'axios pour l'authentification
authService.setupInterceptors()

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')