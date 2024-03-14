import type {App} from "vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist';

export const store = createPinia();

store.use(piniaPersist);
export function setupStore(app : App)
{
    app.use(store);
}


// export * from "./modules"