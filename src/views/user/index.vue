<template>
    <div class="">
        <!-- <div class="fixed w-full h-1/10 bg-white z-10"><Header class="w-full h-full"/></div> -->
        <div class="flex flex-row mt-4">
            <div class=" w-4/5">
                <UserInfo/>
                <div class="bg-white mt-4 mx-8">
                    <div class="px-4 flex flex-row gap-x-4 h-10 border-b border-gray-200 items-center">
                        <div class="ursor-pointer nav-hover nav-active h-full flex items-center px-2 cursor-pointer" @click="changeRouterTo('userSpace')">动态</div>
                        <div class="ursor-pointer nav-hover h-full flex items-center px-2 cursor-pointer" @click="changeRouterTo('userChannel')">频道</div>
                    </div>
                    <router-view class="w-full"></router-view>
                </div>
                
            </div>
            <div class="w-1/6 h-80 ml-4 bg-white rounded-xl overflow-hidden"><Weather/></div>
            
        </div>

        <div class="fixed bottom-32 right-16 text-4xl text-white w-12 h-12 bg-blue-500 text-center rounded-full cursor-pointer" @click="routerHandler.openEditor()">+</div>
        <div class="fixed bottom-12 right-16 text-2xl  w-12 h-12  text-center rounded-full border  flex items-center justify-center shadow-sm cursor-pointer" @click="BackToTop">
            <Icon :size="30">
                <ArrowUp/>
            </Icon>
        </div>
    </div>
</template>
<script setup lang="ts">
    // import Header from "../header/header.vue";
    import "wc-waterfall";
    import WaterBox from "@/components/waterbox.vue";
    import UserInfo from "./userInfo.vue";
    import Weather from "@/components/weather/weather.vue"
    import { useRouter } from "vue-router";
    import {Icon} from "@vicons/utils";
    import {ArrowUp} from "@vicons/ionicons5";
    import * as routerHandler from "@/router/routeHandle";

    const userSpace = ["登录","标题记录","我说这是一个标题","为哦什么","看起来是正确的","元始天尊","标题记录","我说这是一个标题","为哦什么","看起来是正确的","元始天尊"];
    const heightList = [32, 36, 40, 44,56, 52, 72, 80, 96];
    const userNav = ["动态","频道"];
    const router = useRouter();
    
    const openSpaceHandler = (spaceId? : number) =>
    {
        router.push("/user/" + spaceId);
    }

    const BackToTop = () =>
    {
        document.querySelector(".top")?.scrollIntoView({behavior : "smooth"});
    }

    const changeRouterTo = (name : string) =>
    {
        router.push({name});
    }

</script>
    
<style lang="less">
    .nav-hover:hover{
        border-bottom: 1px solid blue;
    }

    .nav-active
    {
        background-color: skyblue;
        color: white;
    }
</style> 