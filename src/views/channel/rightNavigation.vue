<template >
    <div class="px-4 py-4">
        <div class="flex flex-row items-center gap-2 text-base font-bold pb-4">
            <div class="rounded-full w-4 h-4 bg-green-400"></div>
            <div>个性推荐</div>
        </div>
        <div class="flex gap-y-4 flex-col">
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
            <ChannelHomeBox class="px-6"/>
        </div>
        
    </div>
</template>
<script setup lang="ts">
    import ChannelHomeBox from "./channelHomeBox.vue";
</script>
<style lang="less" scoped>
    
</style>