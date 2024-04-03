<template >
    <div class="w-1/2  my-auto mx-auto ">
        <div class="mt-4 bg-white px-4 py-4">
            <div class="flex flex-row gap-4 items-center">
                <img class="w-24 h-24 bg-gray-400 rounded-lg cursor-pointer" :src="general.headImg(channelCommentData?.channelImg!)" @click="jumpToChannelDetail(channelCommentData?.name!)"/>
                <div class="text-2xl text-gray-600">{{ channelCommentData?.name }}</div>
                
            </div>
            <div class="gap-line"></div>

            <div class="px-4">
                <div class="text-xl ">标题： {{ channelCommentData?.title }}</div>
            </div>

            <div class="gap-line"></div>

            <div class="px-4" v-if="channelCommentData">
                <CommentBox class="border-b border-gray-400" :commentData="channelCommentData" :floor="1"/>
                <CommentBox class="border-b border-gray-400" v-for="(item, index) in channelCommentData.subCommentItemData" :key="index" :subCommentData="item as ChannelCommentSubItem" :floor="+(index + 2)"/>

            </div>

            <!-- reply -->
            <div class="pt-8">
                <n-input
                    v-model:value="comment"
                    type="textarea"
                    placeholder="输入内容"
                />
                <div v-permission="commentReply" class="px-4 py-2 bg-blue-400 w-24 text-center text-white text-base rounded-full mt-4 cursor-pointer active:scale-95 transform">回复</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { NInput } from 'naive-ui';
    import CommentBox from './commentBox.vue';
import { onMounted, ref } from 'vue';
import { bringChannelItemDetailAPI, createChannelCommentAPI } from '@/api/channel';
import { useRoute, useRouter } from 'vue-router';
import * as general from "@/utils/general";
import { ChannelCommentData, ChannelCommentSubItem } from '@/typings';

    const channelCommentData = ref<ChannelCommentData>();
    

    const data = {
        followStatus : true
    }

    const commentData = {
        title : "黑神话悟空的序章剧情90%是这个"
    }

    const comment = ref('')

    const route = useRoute();
    const router = useRouter();
    onMounted(async () =>
    {
        let commentId = parseInt(route.params.commentId as string);
        if(isNaN(commentId))
        {
            console.error("commentId is not a number");
            return;
        }
        let ret = await bringChannelItemDetailAPI(commentId)  as unknown as ChannelCommentData;
        ret.isMainComment = true;
        channelCommentData.value = ret;
        console.log(ret)
    })

    const commentReply = async () =>
    {
        let commentId = parseInt(route.params.commentId as string);
        let ret = await createChannelCommentAPI(comment.value, commentId);
        window.message.success("回复成功");
        window.location.reload();
    }

    const jumpToChannelDetail = (channelTitle : string) =>
    {
        if(!channelTitle)
        {
            return;
        }

        router.push({path : "/channelPage/" + channelTitle})
    }

</script>
<style lang="less" scoped>
    input-focus-border:focus{
        outline: 1px solid @color-bottom-blue;
        border-radius:4px;
        // outline : 1px solid @color-gray
    }   
</style>