import type { App } from "vue"
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes : RouteRecordRaw[] = [
    {
        path : "/",
        name : "Root",
        redirect : "/home",
        
    },
    {
        path : "/home",
        name : "home",
        component : () => import("@/views/home.vue"),
        children: [
            {
                path : "/home/:spaceId",
                name : "Space",
                component : () => import("@/components/spaceDetail.vue")
            }
        ]
    },
    {
        path : "/user",
        name : "user",
        component : () => import("@/views/user/index.vue"),
        children: [
            {
                path : "/user/:spaceId",
                name : "userSpace",
                component : () => import("@/components/spaceDetail.vue")
            }
        ]
    }
]

export const router = createRouter({
    history : createWebHashHistory(),
    routes
})

export async function setupRouter(app : App)
{
    app.use(router);
    await router.isReady();
}