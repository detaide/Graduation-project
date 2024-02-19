<template>
    <div class="ml-8 w-9/10 h-64 bg-white p-8 flex flex-row">
        <div class="w-4/5 border-r h-full border-gray-300 flex flex-row gap-12 justify-center">
            <div class="w-32 h-32 rounded-full bg-gray-300"></div>
            <div class="w-52">
                <div class="flex flex-row justify-between items-center">
                    <div class="text-2xl font-bold">你的名字
                        <Icon :size="20" color="blue" v-show="userInfo.gender">
                            <MaleSharp/>
                        </Icon>
                        <Icon :size="20" color="pink" v-show="!userInfo.gender">
                            <FemaleSharp/>
                        </Icon>
                    </div>
                    <div class="text-base w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform">关注</div>
                </div>
                <div class="text-xs text-gray-400 py-1">
                    用户号 : {{ userInfo.userId }}
                </div>

                <div class="whitespace-pre-line pt-1 text-gray-600">
                    {{ userInfo.description }}
                </div>

            </div>
        </div>
        <div class="py-4 px-10 flex flex-col gap-y-4 text-2xl w-1/5">
            <div class="cursor-pointer">
                <span class=" text-lg ">关注</span> <div class="font-bold inline">{{ userInfo.followers }}</div>
            </div>
            <div class="cursor-pointer">
                <span class="text-lg">粉丝</span> <div class="font-bold inline">{{ userInfo.followed }}</div>
            </div>
            <div class="cursor-pointer">
                <span class="text-lg">收藏</span> <div class="font-bold inline">{{ userInfo.favorite }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { Icon } from "@vicons/utils";
    import { MaleSharp, FemaleSharp } from "@vicons/ionicons5";
    import { reactive } from "vue";

    interface UserInfo {
        gender : 0 | 1,      // 1 : male 0 : female
        userId : number,
        description : string,
        followers : number,
        followed : number,
        favorite : number
    }

    const userInfo = reactive<UserInfo>({
        gender : 0,
        userId : 642235636378,
        description : `🏘️ 常驻小宁德
            🏕️ 边徒步 边拍照
            📷 GR3 尼康Z5 MI13U    
        `,
        followers : 12,
        followed : 13,
        favorite : 224
    })
</script>
    
<style lang="less">
    
</style>