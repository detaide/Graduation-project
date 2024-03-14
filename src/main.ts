import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "@/styles/tailwind.css"
import { setupRouter } from './router';
import { setupStore } from './store';
import { useGlobalErrorHandle } from './utils/Error';
import { createDiscreteApi } from 'naive-ui';

async function bootstrap() {
    const app = createApp(App);
    const {message} = createDiscreteApi(["message"]);
    setupStore(app);

    useGlobalErrorHandle(app);

    await setupRouter(app);

    window.message = message;

    app.mount('#app');
    
}

bootstrap()
