<template>
    <div class="ml-8 w-9/10 h-64 bg-white p-8 flex flex-row rounded-xl">
        <div class="w-4/5 border-r h-full border-gray-300 flex flex-row gap-12 justify-center">
            <div class="flex flex-col items-center gap-y-2">
                <img :src="general.headImg(userInfo.avatarURL!)" class="w-32 h-32 rounded-full bg-gray-300"/>
                <div v-show="!homeSelf" class="text-base w-32 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform flex items-center justify-center gap-x-2">
                    <Icon :size="20" color="white">
                        <ChatboxEllipsesSharp/>
                    </Icon>
                    发起聊天
                </div>
            </div>
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
                    <div class="text-base w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform" v-show="!homeSelf && !isFollow" @click="followHandle">关注</div>
                    <div class="text-base w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform" v-show="!homeSelf && isFollow" @click="unFollowHandle">已关注</div>
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
                <span class=" text-lg ">关注</span> <div class="font-bold inline">{{ userInfo.followerNumber || 0 }}</div>
            </div>
            <div class="cursor-pointer">
                <span class="text-lg">粉丝</span> <div class="font-bold inline">{{ userInfo.followedNumber || 0}}</div>
            </div>
            <div class="cursor-pointer">
                <span class="text-lg">收藏</span> <div class="font-bold inline">{{ userInfo.favorite || 0}}</div>
            </div>
        </div>
    </div>
    <n-modal v-model:show="showEditor">
        <UserEditor :userId="props.userId"/>
    </n-modal> 
    
</template>
<script setup lang="ts">
    import { Icon } from "@vicons/utils";
    import { MaleSharp, FemaleSharp, ChatboxEllipsesSharp } from "@vicons/ionicons5";
    import { onMounted, reactive, ref, watch } from "vue";
    import { NModal } from "naive-ui";
    import { useRouter } from "vue-router";
    import UserEditor from "./userEditor.vue";
    import { useUserInfoStore } from "@/store/modules/userInfo";
import { UserMessage } from "@/typings";
import { eventBus } from "@/utils/eventBus";
import { followUserAPI, followUserCancelAPI, getUserDetail, getUserFollowStatusAPI } from "@/api/userInfo";
import * as general from "@/utils/general";



    interface UserInfo extends UserMessage{
        userId : number,
        followerNumber : number,
        followedNumber : number,
        favorite : number
    }

    const homeSelf = ref(true);
    const router = useRouter();
    const showEditor = ref(false);
    const userInfoStore = useUserInfoStore();
    const isFollow = ref(false);

    const userInfo = ref<Partial<UserInfo>>({
        followerNumber : 12,
        followedNumber : 13,
        favorite : 224
    })

    const props = defineProps<{
        userId : number
    }>()

    const userEditorHandle = () =>
    {
        showEditor.value = true;
    }

    eventBus.on("userDetailChange", () =>
    {
        userInfoInit();
    })
    
    const userInfoInit = async () =>
    {
        let userData = await remoteUserInfo(props.userId) as unknown as Partial<UserInfo>;
            console.log(userData)
        let followStatus = await getUserFollowStatusAPI(props.userId);
        isFollow.value = followStatus as unknown as boolean;

        userInfo.value = {
            ...userInfo.value,
            ...userData,
            avatarURL : userData.avatarURL
        }

        homeSelf.value = userData.userId === userInfoStore.id;
    }

    const remoteUserInfo = async (userId : number) =>
    {
        return await getUserDetail(userId);
        
    }

    onMounted(async () =>
    {
        userInfoInit()
        
        
    })

    const followHandle = async () =>
    {
        let ret = await followUserAPI(userInfo.value.userId!);
        window.message.success(ret);
        isFollow.value = true;
    }

    const unFollowHandle = async () =>
    {
        let ret = await followUserCancelAPI(userInfo.value.userId!)
        window.message.success(ret);
        isFollow.value = false;
    }
</script>
    
<style lang="less">
    
</style>