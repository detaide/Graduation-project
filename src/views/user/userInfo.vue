<template>
    <div class="ml-8 w-9/10 h-64 bg-white p-8 flex flex-row rounded-xl">
        <div class="w-4/5 border-r h-full border-gray-300 flex flex-row gap-12 justify-center">
            <img :src="userInfo.avatarURL" class="w-32 h-32 rounded-full bg-gray-300"/>
            <div class="w-52">
                <div class="flex flex-row justify-between items-center">
                    <div class="text-2xl font-bold"> {{ userInfo.nickname }}
                        <Icon :size="20" color="blue" v-show="userInfo.gender === 1">
                            <MaleSharp/>
                        </Icon>
                        <Icon :size="20" color="pink" v-show="userInfo.gender !== 1">
                            <FemaleSharp/>
                        </Icon>
                    </div>
                    <div class="text-base w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform" v-show="!homeSelf">关注</div>
                    <div class="text-base w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform" v-show="homeSelf" @click="userEditorHandle">编辑</div>

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
    <n-modal v-model:show="showEditor">
        <UserEditor/>
    </n-modal> 
    
</template>
<script setup lang="ts">
    import { Icon } from "@vicons/utils";
    import { MaleSharp, FemaleSharp } from "@vicons/ionicons5";
    import { onMounted, reactive, ref, watch } from "vue";
    import { NModal } from "naive-ui";
    import { useRouter } from "vue-router";
    import UserEditor from "./userEditor.vue";
    import { useUserInfoStore } from "@/store/modules/userInfo";
import { UserMessage } from "@/typings";
import { eventBus } from "@/utils/eventBus";



    interface UserInfo extends UserMessage{
        userId : string,
        followers : number,
        followed : number,
        favorite : number
    }

    const homeSelf = ref(true);
    const router = useRouter();
    const showEditor = ref(false);
    const userInfoStore = useUserInfoStore();

    const userInfo = ref<Partial<UserInfo>>({
        followers : 12,
        followed : 13,
        favorite : 224
    })

    const userEditorHandle = () =>
    {
        showEditor.value = true;
    }

    eventBus.on("userDetailChange", () =>
    {
        userInfoInit();
    })
    
    const userInfoInit = () =>
    {
        userInfo.value = {
            ...userInfo.value,
            ...userInfoStore.userDetail,
            avatarURL : userInfoStore.userDetail!.avatarURL
        }
    }

    onMounted(() =>
    {
        userInfoInit()
    })
</script>
    
<style lang="less">
    
</style>