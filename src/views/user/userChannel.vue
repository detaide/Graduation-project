<template >
    <div class="w-full">
        <div class="px-10 py-4 flex flex-col gap-y-4">
            <ChannelHomeBox v-for="(item, index) in channelItemHomeData" :key="index" :channelItemData="item"/>
            <!-- <ChannelHomeBox/> -->
        </div>
        
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
import ChannelHomeBox from '../channel/channelHomeBox.vue';
import { bringChannelItemByUserIdAPI } from '@/api/channel';
import { ChannelCommentData } from '@/typings';

    const channelItemHomeData = ref<Array<ChannelCommentData>>([]);

    onMounted(async () =>
    {
        let ret = await bringChannelItemByUserIdAPI();
        channelItemHomeData.value = ret as unknown as Array<ChannelCommentData>;
    })
</script>
<style lang="less" scoped>
    
</style>