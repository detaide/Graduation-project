<template >
    <div class="flex flex-row py-4">
        <div class=" w-32 border-r flex  pl-2">
            <div class="flex flex-col items-center">
                <img class="w-20 h-20 bg-gray-400 rounded-lg" :src="general.headImg(commentData?.avatarURL!)" @click="userInfoStore.jump2UserHome(commentData.userId)"/>
                <div class="text-center text-gray-500" @click="userInfoStore.jump2UserHome(commentData.userId)">{{ commentData?.nickname }}</div>
                <div v-if="commentData?.isMainComment || (commentData.userId === commentData.ownerId) || (commentData.userId === commentData.commentOwnerId)"
                    class="text-blue-400"
                >
                    楼主
                </div>
            </div>
        </div>
        <div class="w-3/4 px-8 relative">
            <div>{{ commentData?.comment }}</div>
            <div class="flex flex-col gap-2 py-2 mb-10">
                <img alt="img" v-for="(item, index) in imgList" :key="index" :src="item" v-large-img>
            </div>
            <div class="right-8 text-gray-400 pt-2 absolute bottom-2.5 flex flex-row gap-x-2">
                <div>{{ props?.floor }}楼</div>
                <div>发布时间 ： {{ general.timeFormatter(commentData?.publishTime) }}</div>
                <div v-if="(props.floor !== 1) && (commentData?.isMainComment || (commentData.userId === commentData.ownerId) || (commentData.userId === commentData.commentOwnerId))" class="underline cursor-pointer" v-permission="deleteCommentItem">删除</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ChannelCommentData, ChannelCommentSubItem } from '@/typings';
import { onMounted, ref } from 'vue';
import * as general from "@/utils/general";
import { deleteChannelCommentAPI } from '@/api/channel';
import {useUserInfoStore} from "@/store/modules/userInfo";

    interface Emit{
        (ev : "deleteItem" , commentItemId : number) : void
    }

    const commentData = ref<Partial<ChannelCommentData>>({});
    const imgList = ref<Array<string>>([]);

    const props = defineProps<{
        commentData? : ChannelCommentData,
        subCommentData? : ChannelCommentSubItem,
        floor? : number
    }>();

    const userInfoStore = useUserInfoStore();
    

    const emit = defineEmits<Emit>();

    onMounted(() =>
    {
        // console.log("props : ", props.subCommentData);
        
        let imgObj = JSON.parse(props.commentData?.imgURL || '{}');
        for(let key in imgObj)
        {
            imgList.value.push(general.headImg(imgObj[key]));
        }
        commentData.value = props.commentData! || props.subCommentData;
    })

    const deleteCommentItem = async () =>
    {
        let commentItemId = commentData.value.id!;
        await deleteChannelCommentAPI(commentItemId);
        window.message.success("删除成功");
        emit("deleteItem", commentItemId);
    }
    
</script>
<style lang="less" scoped>
    
</style>