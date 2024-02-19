<template>
    <div class="flex flex-row">
        <div class="w-6 h-6 rounded-full bg-gray-400"></div>
        <div class="px-2">
            <div class="text-gray-400">username</div>
            <div class="text-gray-600">我是一条评论</div>
            <div class="text-gray-400 text-xs pt-2">2024-01-05 12:25:37</div>
            <div class="flex flex-row gap-2 px-2 py-2 text-xs text-gray-400">
                <div class="flex items-center gap-1 cursor-pointer ">
                    <Icon :size="12">
                        <HeartOutline/>
                    </Icon>
                    <div>200</div>
                </div>
                <div class="flex items-center gap-1 cursor-pointer">
                    <Icon :size="12">
                        <ChatboxEllipsesOutline/>
                    </Icon>
                    <div>2</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { Icon } from '@vicons/utils';
    import { HeartOutline, ChatboxEllipsesOutline } from '@vicons/ionicons5';
</script>
    
<style lang="less" scoped>
    
</style>