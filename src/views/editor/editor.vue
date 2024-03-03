<template>
    <div class="px-20">
        <div class="w-full flex flex-row pt-4 px-4">
            <input placeHolder="请输入标题" class="w-5/6 h-16 px-4 text-xl font-bold input-focus-border mb-2"/>
            <div class="ml-4 text-center text-white text-3xl bg-blue-500 w-1/12 h-16 leading-loose active:scale-95 transform cursor-pointer rounded-r-md">发布</div>
        </div>
        <Vditor/>
        
    </div>
</template>
<script setup lang='ts'>
    import Vditor from "./vditor.vue";
</script>
    
<style lang="less" scoped>
    .input-focus-border:focus{
        outline: 1px solid @color-bottom-blue;
        border-radius:4px;
        // outline : 1px solid @color-gray
    }
</style>