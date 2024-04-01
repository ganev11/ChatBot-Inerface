import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import createPinia

import './style.css'
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia() // Create a Pinia instance
app.use(pinia) // Tell Vue to use Pinia

app.mount('#app')
