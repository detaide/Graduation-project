import type { App } from "vue"
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes : RouteRecordRaw[] = [
    {
        path : "/",
        name : "Root",
        redirect : "/home",
        
    },
    {
        path : '/demo',
        name : "demo",
        component : () => import("@/components/demo.vue")
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
        path : "/user/:userId",
        name : "user",
        component : () => import("@/views/user/index.vue"),
        redirect : {name : "userSpace"},
        children: [
            // {
            //     path : "/user/:userId",
            //     name : "userDetail",
            //     component : () => import("@/views/user/index.vue")
            // },
            {
                path : "/user/:userId/userSpace",
                name : "userSpace",
                component : () => import("@/views/user/userSpace.vue"),
                children : [
                    {
                        path: "/user/userSpace/:spaceId",
                        name : "spaceDetail",
                        component : () => import("@/components/spaceDetail.vue")
                    }
                ]
            },
            {
                path : "userChannel",
                name : "userChannel",
                component : () => import("@/views/user/userChannel.vue")
            }
            
        ]
    },
    {
        path : "/editor",
        name : "editor",
        component : () => import("@/views/editor/editor.vue")
    },
    {
        path : "/channel",
        name : "channel",
        component : () => import("@/views/channel/index.vue")
    },
    {
        path : "/channelPage/:channelName",
        name : "channelPage",
        component : () => import("@/views/channel/channelPageLet.vue")
    },
    {
        path : "/commentInfo/:commentId",
        name : "commentInfo",
        component : () => import("@/views/channel/commentInfo.vue")
    }
]

export const router = createRouter({
    history : createWebHistory(),
    routes
})

export async function setupRouter(app : App)
{
    app.use(router);
    await router.isReady();
}