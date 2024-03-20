<script setup lang="ts">
    import Login from "@/components/Login/login.vue";
    import Header from "@/views/header/header.vue";
    import {Icon} from "@vicons/utils";
    import {ArrowUp, ChatbubbleEllipses} from "@vicons/ionicons5";
    import { NModal } from "naive-ui";
import { ref } from "vue";

    const chatModelShow = ref(true);

</script>

<template>
    <div>
        <div class="top invisible"></div>
        <div class="fixed w-full h-1/10 bg-white z-40"><Header class="w-full h-full"/></div>
        <RouterView class="pt-24"/>
        <div class="fixed w-full h-full left-0 top-0 z-50 loginModel display-hide">
            <Login/>
        </div>
        <div class="fixed bottom-48 right-16 text-4xl text-white w-12 h-12 bg-red-500 text-center rounded-full pt-1 cursor-pointer active:scale-95 transform" >
            <Icon :size="30">
                <ChatbubbleEllipses/>
            </Icon>
        </div>

        <n-modal v-model:show="chatModelShow">
            <div>12332122</div>
        </n-modal> 
        
    </div>
    
</template>

<style scoped>
    .display-hide{
        display: none;
    }
</style>
