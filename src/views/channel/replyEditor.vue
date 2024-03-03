<template >
    <div class="py-4 px-4 bg-gray-200">
        <input placeHolder="请输入标题" class="w-5/6 h-8 px-4 text-base font-bold input-focus-border mb-2 rounded-lg"/>
        <n-input
            v-model:value="value"
            type="textarea"
            placeholder="输入内容"
        />
        <div class="px-4 py-2 bg-blue-400 w-24 text-center text-white text-base rounded-full mt-4 cursor-pointer active:scale-95 transform">发布</div>
    </div>
</template>
<script setup lang="ts">
    import { NInput } from 'naive-ui';
    const value="请输入内容";
</script>
<style lang="less" scoped>
    .input-focus-border:focus{
        outline: 1px solid @color-bottom-blue;
        border-radius:4px;
        // outline : 1px solid @color-gray
    }
</style>