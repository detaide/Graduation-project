<template>
    <div class="w-full  pb-4">
        <!-- <div class="fixed w-full h-1/10 bg-white z-10"><Header class="w-full h-full"/></div> -->
        <Content class="w-full" 
            @open-space="openSpaceHandler"/>
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
    // import Header from "@/views/header/header.vue"
    import Content from "@/views/content/content.vue"
    import { useRouter } from "vue-router";
    import {Icon} from "@vicons/utils";
    import {ArrowUp} from "@vicons/ionicons5";
    import * as routerHandler from "@/router/routeHandle"
    
    const router = useRouter();


    const openSpaceHandler = (spaceId? : number) =>
    {
        router.push("/home/" + spaceId);
    }

    const BackToTop = () =>
    {
        document.querySelector(".top")?.scrollIntoView({behavior : "smooth"});
    }

</script>
    
<style lang="less" scoped>
    .mask{
        background-color: @color-mask;
    }
</style>