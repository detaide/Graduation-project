<template >
    <div class="px-4 py-4">
        <div class="flex flex-row items-center gap-2 text-base font-bold pb-4">
            <div class="rounded-full w-4 h-4 bg-green-400"></div>
            <div>我的关注</div>
        </div>
        <div class="">
            
        </div>
        <div v-show="!love" class="w-full flex justify-center border rounded-lg">
            <div class="py-4 text-gray-400 ">空空如也...</div>
        </div>
        <div class="gap-line" v-show="love"></div>
    </div>
</template>
<script setup lang="ts">
    const love = false;
</script>
<style lang="less" scoped>
    @import url("@/styles/global.less");
</style>