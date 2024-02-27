<template>
    <div class="">
        <!-- <div class="fixed w-full h-1/10 bg-white z-10"><Header class="w-full h-full"/></div> -->
        <div class="flex flex-row">
            <div class=" w-4/5">
                <UserInfo class="rounded-xl"/>
                <div v-show="!userSpace || !userSpace.length" class="text-gray-500 text-lg w-full m-auto text-center pt-10">空空如也...</div>
                <wc-waterfall :gap="14" :cols="3" class="px-6 py-6 w-full ">
                    <WaterBox v-for="(item, index) in userSpace" :key="index"
                        :height="heightList[Math.floor(Math.random() * heightList.length)]"
                        :title="item"
                        class="py-2"
                        @open-space="openSpaceHandler"
                    >

                    </WaterBox>
                </wc-waterfall>

            </div>
            <div class="w-1/6 h-80 ml-4 bg-white rounded-xl overflow-hidden"><Weather/></div>
            
        </div>
        <router-view></router-view>
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
    const router = useRouter();
    
    const openSpaceHandler = (spaceId? : number) =>
    {
        router.push("/user/" + spaceId);
    }

    const BackToTop = () =>
    {
        document.querySelector(".top")?.scrollIntoView({behavior : "smooth"});
    }

</script>
    
<style lang="less">
    
</style> 