import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "@/styles/tailwind.css"
import { setupRouter } from './router';
import { setupStore } from './store';
import { useGlobalErrorHandle } from './utils/Error';
import { createDiscreteApi } from 'naive-ui';
import { TUIComponents, TUIChatKit, genTestUserSig, useTUIKit } from "./TUIKit";
import { TUILogin } from "@tencentcloud/tui-core";
import * as general from "@/utils/general";
import { getWeatherAPI } from './utils/gaodeAPI';

const SDKAppID = 1600028196; // Your SDKAppID
const secretKey = "eb80e1a18137ab3055ff966c4cb89be5a8852f3ee5d0f9cc1a71796c79e2568f"; //Your secretKey
const userID = "demouser1"; // User ID

async function bootstrap() {
    const app = createApp(App);
    const {message} = createDiscreteApi(["message"]);
    await setupStore(app);

    useGlobalErrorHandle(app);

    await setupRouter(app);

    window.message = message;

    useTUIKit(app);

    general.init();

    app.mount('#app');

    // let ret = await getWeatherAPI()
    // console.log(ret)
    
}

bootstrap()
