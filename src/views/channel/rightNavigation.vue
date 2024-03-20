<template >
    <div class="px-4 py-4">
        <div class="flex flex-row items-center gap-2 text-base font-bold pb-4">
            <div class="rounded-full w-4 h-4 bg-green-400"></div>
            <div>个性推荐</div>
        </div>
        <div class="flex gap-y-4 flex-col">
            <ChannelHomeBox class="px-6" v-for="(item, index) in channelItemHomeData" :key="index" :channel-item-data="item"/>
            <!-- <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/> -->
        </div>
        
    </div>
</template>
<script setup lang="ts">
    import ChannelHomeBox from "./channelHomeBox.vue";
    import { bringChannelItemByUserIdAPI } from '@/api/channel';
    import { ChannelCommentData } from '@/typings';
    import {ref, onMounted} from 'vue';
    import {bringAllChannelItemAPI} from "@/api/channel";

    const channelItemHomeData = ref<Array<ChannelCommentData>>([]);

    onMounted(async () =>
    {
        let ret = await bringAllChannelItemAPI();
        channelItemHomeData.value = ret as unknown as Array<ChannelCommentData>;
    })
</script>
<style lang="less" scoped>
    
</style>