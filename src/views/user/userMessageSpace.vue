<template >
    <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div class="w-2/5 h-48  flex flex-row p-4 border-gray-400 border rounded-lg" v-for="(item, index) in props.spaceMessage" :key="index">
            <!-- 人头 -->
            <div class="w-1/8  h-full">
                <img :src="general.headImg(item.avatarURL || '')" alt="" class="w-20 h-20 rounded-full m-auto bg-white cursor-pointer" @click="userInfoStore.jump2UserHome(item.commentUserId)">
                <div class="mt-12" :class="(item.read === 0) ? 'text-red-500' : 'text-green-500'">{{ item.read ? '已读' : '未读' }}</div>
            </div>
            <!-- 信息 -->
            <div class="w-7/8  h-full flex flex-col ml-4">
                <div class="font-bold text-sm">{{ item.nickname }}</div>
                <div class="text-xs text-gray-500 flex flex-row gap-4">
                    <div>评论了你的动态</div>
                    <div>{{ general.timeFormatter(item.publishTime) }}</div>
                </div>
                <div class="text-lg flex flex-row items-center gap-x-2"><div class="text-xs text-gray-400">评论内容: </div>{{textOverflow(item.comment)}}</div>
                <div class="w-full bg-gray-200 h-3/5 flex flex-row gap-2 cursor-pointer p-2 rounded-lg" @click="spaceTrigger(item.spaceId)">
                    <img :src="general.spaceInfoTakeFirstImg(item.info)" alt="" class="w-16 h-16 border border-gray-300">
                    <div>{{item.title}}</div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script setup lang="ts">
    import {defineProps, defineEmits} from "vue";
    import {SpaceMessageType} from "@/typings";
    import * as general from "@/utils/general";
    import { useUserInfoStore } from "@/store/modules/userInfo";
    
    interface Emit{
        (key : 'spaceTrigger', spaceId : number) : void
    }

    const emit = defineEmits<Emit>();
    const userInfoStore = useUserInfoStore();

    const props = defineProps<{
        spaceMessage : Array<SpaceMessageType>
    }>();

    const spaceTrigger = (spaceId : number) =>
    {
        emit("spaceTrigger", spaceId);
    }

    const textOverflow = (text  :string) =>
    {
        if(!text)   return "";
        let length = 8;
        return text.length > length ? text.slice(0, length) + '...' : text;
    }


</script>
<style lang="less" scoped>
    
</style>