<template >
    <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div class="w-4/5 h-32  flex flex-row p-4 border-gray-400 border rounded-lg" v-for="(item, index) in props.channelMessage" :key="index">
            <!-- 人头 -->
            <div class="w-1/8  h-full">
                <img :src="general.headImg(item.avatarURL || '')" alt="" class="w-12 h-12 rounded-full m-auto bg-white cursor-pointer" @click="userInfoStore.jump2UserHome(item.commentUserId)">
                <div class="mt-6" :class="(item.read === 0) ? 'text-red-500' : 'text-green-500'">{{ item.read ? '已读' : '未读' }}</div>
            </div>
            <!-- 信息 -->
            <div class="w-7/8  h-full flex flex-col ml-4">
                <div class="font-bold text-sm">{{ item.nickname }}</div>
                <div class="text-xs text-gray-500 flex flex-row gap-4">
                    <div>评论了你的帖子</div>
                    <div>{{ general.timeFormatter(item.publishTime) }}</div>
                </div>
                <div class="text-lg flex flex-row items-center gap-x-2"><div class="text-xs text-gray-400">评论内容: </div>{{textOverflow(item.comment)}}</div>
                <div @click="jump2ChannelItem(item.channelItemId)" class="bg-gray-200 border-l-2 border-gray-400 px-2 text-gray-500 text-lg cursor-pointer">{{textOverflow(item.title)}}</div>
            </div>
            
        </div>
    </div>
</template>
<script setup lang="ts">
    import {defineProps, defineEmits} from "vue";
    import {ChannelMessageType} from "@/typings";
    import * as general from "@/utils/general";
    import { useUserInfoStore } from "@/store/modules/userInfo";
    

    const userInfoStore = useUserInfoStore();

    const props = defineProps<{
        channelMessage : Array<ChannelMessageType>
    }>();

    const textOverflow = (text  :string) =>
    {
        if(!text)   return "";
        let length = 20;
        return text.length > length ? text.slice(0, length) + '...' : text;
    }

    const jump2ChannelItem = (channelItemId : number) =>
    {
        window.open(window.location.origin + "/commentInfo/" + channelItemId, "_blank")
        // router.push({
        //     path : "/commentInfo/" + channelId
        // })
    }


</script>
<style lang="less" scoped>
    
</style>