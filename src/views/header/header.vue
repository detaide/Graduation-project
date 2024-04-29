<template>
    <div class="flex flex-row px-20 justify-between bg-white">
       <div class="flex ">
            <!-- <div class="flex items-center justify-center bg-blue-pink min-w-200 rounded"> -->
                <!-- <div class=" text-4xl font-bold ">LOGO</div> -->
                <div class="logo"></div>
            <!-- </div> -->
            <ul class="flex flex-row pl-6">
                <li v-for="(item, index) in liItem" :key="index" :class="(item.key === activeShow) && 'nav-active-header'" class="flex justify-center text-sm items-center text-center px-2 py-0.5 hover-bottom-blue hover-blue"><a @click="jumpTo(item.key)" class="cursor-pointer">{{ item.title }}</a></li>
                <li :class="('selfHome' === activeShow) && 'nav-active-header'" class="flex justify-center text-sm items-center text-center px-2 py-0.5 hover-bottom-blue hover-blue"><a @click="jumpTo('selfHome')" class="cursor-pointer">{{ "我的主页" }}</a></li>
            </ul>
       </div>

        <div class="flex items-center justify-center gap-x-2 cursor-pointer">
            <Search @search="seachHandle"/>
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
    import { onMounted, watch, ref, computed, onUpdated } from "vue";
    import { eventBus } from "@/utils/eventBus";

    type ItemKeyType = "Home" | "channel" | "editor" | "selfHome";

    const liItem : Array<{key : ItemKeyType, title : string}> = [
        // {
        //     key : "Home",
        //     title : "首页"
        // },
        {
            key : "Home",
            title : "动态"
        },
        // {
        //     key : "",
        //     title : "校园集市"
        // },
        {
            key : "channel",
            title :  "校园频道"
        },
        // {
        //     key : "editor",
        //     title : "编辑"
        // }
    ];

    
    const router = useRouter();
    const userInfoStore = useUserInfoStore();
    const loginStatus = ref(false);
    const avatarToolShow = ref(false);
    const activeShow = ref<ItemKeyType>("Home");
    const navLocationMap = {
        "channelPage" : "channel",
        "channel" : "channel",
        "commentInfo" : "channel",
        "user" : "selfHome",
        "home" : "Home",

    }

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

    const jump2Home = async () =>
    {
        let loginStatus = await userInfoStore.isLogin();
        if(!loginStatus)
        {
            window.message.error("请先登录");
            return;
        }

        userInfoStore.jump2UserHome(0, true, true);
        avatarToolShow.value = false;
        activeShow.value = "selfHome";
    }

    const logout = () =>
    {
        userInfoStore.logout();
        avatarToolShow.value = false;
        router.push("/home");
        activeShow.value = "Home";
        console.log("activeShow", activeShow)
    }

    const loginHandleTrigger = () =>
    {
        LoginModel.openLoginModel();
    }

    const jumpTo = (path : ItemKeyType) =>
    {
        if(path === "selfHome")
        {
            jump2Home();
            return;
        }
        activeShow.value = path;
        router.push('/' + path);
    }

    onMounted(async () =>
    {
        loginStatus.value = await userInfoStore.isLogin();
        let mainRouter = window.location.pathname.split("/")[1];
        activeShow.value = navLocationMap[mainRouter as keyof typeof navLocationMap] as ItemKeyType || "Home" ;
    })
    

    eventBus.on("Login", async () =>
    {
        loginStatus.value = await userInfoStore.isLogin();
    })

    eventBus.on("logout", () =>
    {
        loginStatus.value = false;
        // LoginModel.openLoginModel();
    })

    const seachHandle = (keywords : string) =>
    {
        router.push("/search/" + keywords);
    }

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
    .nav-active-header{
        border-bottom: 2px solid @color-bottom-blue;
        color: @color-bottom-blue;
    }
    .logo{
        background: url("@/assets/logo2.png");
        background-size: cover;
        background-repeat: no-repeat;
        width: 160px;
        height: 100px;
    }
</style>