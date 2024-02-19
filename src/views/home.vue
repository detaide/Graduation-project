<template>
    <div class="w-full  pb-4">
        <div class="fixed w-full h-1/10 bg-white z-10"><Header class="w-full h-full"/></div>
        <Content class="w-full pt-24" 
            @open-space="openSpaceHandler"/>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
    import Header from "@/views/header/header.vue"
    import Content from "@/views/content/content.vue"
    import { useRouter } from "vue-router";

    const router = useRouter();


    const openSpaceHandler = (spaceId? : number) =>
    {
        router.push("/home/" + spaceId);
    }

</script>
    
<style lang="less" scoped>
    .mask{
        background-color: @color-mask;
    }
</style>