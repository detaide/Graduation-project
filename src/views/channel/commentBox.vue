<template >
    <div class="flex flex-row py-8">
        <div class=" w-32 border-r flex items-center justify-center">
            <div class="flex flex-col items-center">
                <div class="w-20 h-20 bg-gray-400 rounded-lg"></div>
                <div class="text-center text-gray-500">{{ data.user }}</div>
            </div>
        </div>
        <div class="w-3/4 px-8 relative">
            <div>{{ data.comment }}</div>
            <div class="absolute right-8 text-gray-400">发布时间 ： {{ data.publishTime }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const data = 
        {
            user : "西夏哈哈",
            comment : `我没有记错的话当初斗战神猴子职业的序章是玩家在花果山睡觉，梦见自己变成齐天大圣在天庭大闹天宫，然后熟悉一系列后期解锁的技能和能力，最后醒来发现是一场梦，自己只是一只小猴子，通过20年黑神话首曝的预告片内容已知玩家是有扮演悟空以及大闹天宫打十万天兵的内容的，再结合最新的demo试玩内容已知目前黑神话的悟空战斗系统和斗战神的猴子战斗系统有非常多相似之处，我认为就合理性以及对于曾经斗战神的情感等各方面来说，序章内容和曾经的斗战神猴子序章相差不多的可能性是非常大的`,
            publishTime : "2024-03-01 17:42:12"
        }
    
</script>
<style lang="less" scoped>
    
</style>