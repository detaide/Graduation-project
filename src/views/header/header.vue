<template>
    <div class="flex flex-row px-20 justify-between bg-white">
       <div class="flex ">
            <div class="flex items-center justify-center bg-blue-pink min-w-200 rounded">
                <div class=" text-4xl font-bold ">LOGO</div>
            </div>
            <ul class="flex flex-row pl-6">
                <li v-for="(item, index) in liItem" :key="index" class="flex justify-center text-sm items-center text-center px-2 py-0.5 hover-bottom-blue hover-blue"><a href="">{{ item }}</a></li>
            </ul>
       </div>

        <div class="flex items-center justify-center gap-x-2 cursor-pointer">
            <Search/>
            <n-avatar round :src="avatar" @click="loginHandle"/>
        </div>
    </div>
    
</template>
<script setup lang="ts">
    import Search from "./search.vue";
    import {NAvatar} from "naive-ui";
    import * as LoginModel from "@/utils/general/loginModel"
    const liItem = ["首页","动态","校园集市", "校园频道"];
    const avatar = 'https://img.zcool.cn/community/0122a15d22b574a801213763e36eba.jpg@2o.jpg';

    const loginHandle = () =>
    {
        LoginModel.openLoginModel();
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
</style>