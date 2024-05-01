import type { App } from "vue"
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import {usePermission} from "./permision";

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
        // meta : {
        //     requiresAuth : true,
        // },
        component : () => import("@/views/user/index.vue"),
        redirect : {name : "userSpace"},
        children: [
            {
                path : "/user/:userId/userSpace",
                name : "userSpace",
                component : () => import("@/views/user/userSpace.vue"),
                children : [
                    {
                        path: ":spaceId",
                        name : "userSpaceDetail",
                        component : () => import("@/components/spaceDetail.vue")
                    }
                ]
            },
            {
                path : "userChannel",
                name : "userChannel",
                component : () => import("@/views/user/userChannel.vue")
            },
            {
                path : "/user/:userId/userCollection",
                name : "userCollection",
                component : () => import("@/views/user/userCollection.vue"),
                children : [
                    {
                        path: ":spaceId",
                        name : "userCollectionDetail",
                        component : () => import("@/components/spaceDetail.vue")
                    }
                ]
            },
            
            
        ]
    },
    {
        path : "/userMessage",
        name : "userMessage",
        component : () => import("@/views/user/userMessage.vue"),
        children : [
            {
                path : ":spaceId",
                name : "userMessageSpace",
                component : () => import("@/components/spaceDetail.vue")
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
    },
    {
        path : "/search/:keyword",
        name : "search",
        component : () => import("@/views/search/index.vue"),
        children : [
            {
                path : "/search/:keyword/space/:spaceId",
                name : "searchSpace",
                component : () => import("@/components/spaceDetail.vue")
            }
        ]
    }
]

export const router = createRouter({
    history : createWebHistory(),
    routes
})

export async function setupRouter(app : App)
{
    app.use(router);
    await usePermission(router);
    await router.isReady();
}