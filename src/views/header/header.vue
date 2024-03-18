<template>
    <div class="flex flex-row px-20 justify-between bg-white">
       <div class="flex ">
            <div class="flex items-center justify-center bg-blue-pink min-w-200 rounded">
                <div class=" text-4xl font-bold ">LOGO</div>
            </div>
            <ul class="flex flex-row pl-6">
                <li v-for="(item, index) in liItem" :key="index" class="flex justify-center text-sm items-center text-center px-2 py-0.5 hover-bottom-blue hover-blue"><a @click="jumpTo(item.key)" class="cursor-pointer">{{ item.title }}</a></li>
            </ul>
       </div>

        <div class="flex items-center justify-center gap-x-2 cursor-pointer">
            <Search/>
            <div class="relative">
                <n-avatar round :src="avatar" @click="loginHandle" v-show="loginStatus"/>
                <div class="absolute -left-8 top-12 w-24 h-24 bg-white border border-gray-400 p-1 rounded-lg" v-show="avatarToolShow">
                    <div class="w-full py-2 hover:bg-gray-200 rounded-md text-center" @click="jump2Home">我的主页</div>
                    <div class="w-full py-2 hover:bg-gray-200 rounded-md text-center" @click="logout">退出登录</div>
                </div>
            </div>
            <div class="w-12 h-6 bg-blue-400 cursor-pointer text-center text-white" @click="loginHandleTrigger" v-show="!loginStatus"> 登录</div>
        </div>
    </div>
    
</template>
<script setup lang="ts">
    import Search from "./search.vue";
    import {NAvatar, createDiscreteApi} from "naive-ui";
    import * as LoginModel from "@/utils/general/loginModel";
    import {useRouter} from "vue-router";
    import { useUserInfoStore } from "@/store/modules/userInfo";
    import { onMounted, watch, ref, computed } from "vue";
    import { eventBus } from "@/utils/eventBus";

    const liItem = [
        {
            key : "Home",
            title : "首页"
        },
        {
            key : "",
            title : "动态"
        },
        {
            key : "",
            title : "校园集市"
        },
        {
            key : "channel",
            title :  "校园频道"
        },
        {
            key : "editor",
            title : "编辑"
        }
    ];

    const router = useRouter();
    const userInfoStore = useUserInfoStore();
    const loginStatus = ref(false);
    const avatarToolShow = ref(false);

    const avatar = computed(() =>
    {
        return userInfoStore.getUserDetail().avatarURL;
    })

    const loginHandle = () =>
    {
        // LoginModel.openLoginModel();
        // router.push("/user")
        avatarToolShow.value = !avatarToolShow.value;
    }

    const jump2Home = () =>
    {
        router.push("/user");
        avatarToolShow.value = false;
    }

    const logout = () =>
    {
        userInfoStore.logout();
        avatarToolShow.value = false;
        router.push("/home");
    }

    const loginHandleTrigger = () =>
    {
        LoginModel.openLoginModel();
    }

    const jumpTo = (path : string) =>
    {
        router.push('/' + path);
    }

    onMounted(() =>
    {
        loginStatus.value = userInfoStore.isLogin();
    })

    eventBus.on("Login", () =>
    {
        console.log("login")
        loginStatus.value = userInfoStore.isLogin();
    })

    eventBus.on("logout", () =>
    {
        loginStatus.value = false;
        LoginModel.openLoginModel();
    })

</script>
    
<style lang="less" scoped>
    .hover-bottom-blue:hover{
        border-bottom: 2px solid @color-bottom-blue;
    }
    .hover-blue:hover{
        color: @color-bottom-blue;
    }
    .bg-blue-pink{
        background: linear-gradient(-45deg, skyblue, lightPink);
    }
    
    .min-w-200{
        min-width: 200px;
    }
</style>