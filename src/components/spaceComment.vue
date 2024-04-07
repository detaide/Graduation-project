<template>
    <div class="px-4 py-4">
        <div class="text-gray-400">总计 {{ commentInfoRef.length }} 条</div>
        <div class="py-4">
            <Comment-Item v-for="(item, index) in commentInfoRef" :key="item.id"
                :commentInfo="item"
                @deleteItem="deleteItem"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import CommentItem from "./commentItem.vue"
    import { bringSpaceCommentBySpaceId } from "@/api/space";
    import * as general from "@/utils/general";
import { CommentInfoType } from "@/typings";

    interface Props
    {
        spaceId : number
    }

    const props = defineProps<Props>();
    const commentInfoRef = ref<Array<CommentInfoType>>([]);

    onMounted(async () =>
    {
        let commentInfo = await bringSpaceCommentBySpaceId(props.spaceId) as unknown as Array<CommentInfoType>;
        commentInfoRef.value = commentInfo.map((item) =>
        {
            item.avatarURL = general.headImg(item.avatarURL);
            item.publishTime = general.timeFormatter(item.publishTime as number, true);
            return item;
        });
    })

    const addCommenthandle = (contetnInfo : CommentInfoType) =>
    {
        contetnInfo.avatarURL = general.headImg(contetnInfo.avatarURL);
        contetnInfo.publishTime = general.timeFormatter(contetnInfo.publishTime as number, true);
        contetnInfo && commentInfoRef.value.unshift(contetnInfo)
        return commentInfoRef.value.length;
    }

    const deleteItem = (itemId : number) =>
    {
        commentInfoRef.value?.forEach((item, index) =>
        {
            if(item.id == itemId)
                commentInfoRef.value.splice(index, 1);
        
        })
    }

    defineExpose({
        addCommenthandle
    })
</script>
    
<style lang="less" scoped>
    
</style>