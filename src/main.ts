import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "@/styles/tailwind.css"
import { setupRouter } from './router';
import { setupStore } from './store';

async function bootstrap() {
    const app = createApp(App);

    setupStore(app);

    await setupRouter(app);

    app.mount('#app');
}

bootstrap()
