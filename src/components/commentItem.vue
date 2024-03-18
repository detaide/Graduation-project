<template>
    <div class="flex flex-row">
        <img class="w-8 h-8 rounded-full bg-gray-400" :src="props.commentInfo.avatarURL"/>
        <div class="px-4">
            <div class="text-gray-400">{{ props.commentInfo.nickname }}</div>
            <div class="text-gray-600">{{ props.commentInfo.comment }}</div>
            <div class="text-gray-400 text-xs pt-2">{{ props.commentInfo.publishTime }}</div>
            <div class="flex flex-row gap-2 px-2 py-2 text-xs text-gray-400" @click="addThumbHandle">
                <div class="flex items-center gap-1 cursor-pointer ">
                    <Icon :size="12" v-if="!isCheckThumb">
                        <HeartOutline/>
                    </Icon>
                    <Icon :size="12" class="red-heart" v-if="isCheckThumb">
                        <Heart/>
                    </Icon>
                    <div>{{ thumbsNumber }}</div>
                </div>
                <!-- <div class="flex items-center gap-1 cursor-pointer">
                    <Icon :size="12">
                        <ChatboxEllipsesOutline/>
                    </Icon>
                    <div>2</div>
                </div> -->
            </div>
            <!-- <div class="pl-2">
                <Comment-Sub-Item/>
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
    import { Icon } from '@vicons/utils';
    import { HeartOutline, ChatboxEllipsesOutline, Heart } from '@vicons/ionicons5';
    import CommentSubItem from './commentSubItem.vue';
    import { onMounted, ref } from 'vue';
    import { CommentInfoType } from '@/typings';
    import { addThumbsAPI } from '@/api/space';

    const props = defineProps<{
        commentInfo: CommentInfoType
    }>();

    const isCheckThumb = ref(false);
    const thumbsNumber = ref(0);

    onMounted(() =>
    {
        thumbsNumber.value = props.commentInfo.thumbs;
    })

    const addThumbHandle = async () =>
    {
        if(isCheckThumb.value)
        {
            window.message.error("已经点赞过了");
            return;
        }

        await addThumbsAPI(props.commentInfo.id);
        isCheckThumb.value = true;
        thumbsNumber.value += 1;
        window.message.success("点赞成功");
    }


    
</script>
    
<style lang="less" scoped>
    .red-heart{
        color: red;
    }
</style>