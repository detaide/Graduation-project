<template >
    <div class="flex flex-row cursor-pointer" @click="jump2ChannelInfo(props.itemData.id)">
        <div class="w-3/4 flex flex-col justify-between gap-2">
            <div class="flex flex-row gap-4">
                <div class="text-blue-500 underline">{{ props.itemData.title }}</div>
                <div class="text-white bg-red-400 px-4 rounded-full">{{ props.itemData.commentNumber || 0 }}</div>
            </div>
            <div class="text-gray-400">{{ props.itemData.comment.slice(0, 100) }}</div>
        </div>

        <div class="w-1/4 text-gray-400 flex flex-col gap-4 pl-10">
            <div> 帖主 : {{ props.itemData.nickname }}</div>
            <div> 时间 : {{ general.timeFormatter(props.itemData.publishTime) }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { router } from '@/router';
import { ItemType } from '@/typings';
import * as general from '@/utils/general';

    const props = defineProps<{
        itemData : ItemType
    }>()

    const data = {
        commentTitle : "黑神话悟空的序章剧情90%是这个",
        commentMemo : `我没有记错的话当初斗战神猴子职业的序章是玩家在花果山睡觉，梦见自己变成齐天大圣在天庭大闹天宫，然后熟悉一系列后期解锁的技能和能力，最后醒来发现是一场梦，自己只是一只小猴子，通过20年黑神话首曝的预告片内容已知玩家是有扮演悟空以及大闹天宫打十万天兵的内容的，再结合最新的demo试玩内容已知目前黑神话的悟空战斗系统和斗战神的猴子战斗系统有非常多相似之处，我认为就合理性以及对于曾经斗战神的情感等各方面来说，序章内容和曾经的斗战神猴子序章相差不多的可能性是非常大的`,
        commentAuthor : "user123",
        replyNumber : 58,
        publishTime : '2024-02-21 02:24:58'
    }

    const jump2ChannelInfo = (channelId : number) =>
        {
            router.push({
                path : "/commentInfo/" + channelId
            })
        }

</script>
<style lang="less" scoped>
    
</style>