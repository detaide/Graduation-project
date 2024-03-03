<template >
    <div class="w-1/2  my-auto mx-auto ">
        <div class="mt-4 bg-white px-4 py-4">
            <div class="flex flex-row gap-4 items-center">
                <div class="w-24 h-24 bg-gray-400 rounded-lg"></div>
                <div class="text-2xl text-gray-600">黑神话</div>
                <div class="text-sm w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform">
                    <span v-show="!data.followStatus">关注</span>
                    <span v-show="data.followStatus">已关注</span>
                </div>
                
            </div>
            <div class="gap-line"></div>

            <div class="px-4">
                <div class="text-xl ">标题： {{ commentData.title }}</div>
            </div>

            <div class="gap-line"></div>

            <div class="px-4">
                <CommentBox class="border-b border-gray-400"/>
                <CommentBox class="border-b border-gray-400"/>
                <CommentBox class="border-b border-gray-400"/>
                <CommentBox class="border-b border-gray-400"/>
            </div>

            <!-- reply -->
            <div class="pt-8">
                <n-input
                    v-model:value="value"
                    type="textarea"
                    placeholder="输入内容"
                />
                <div class="px-4 py-2 bg-blue-400 w-24 text-center text-white text-base rounded-full mt-4 cursor-pointer active:scale-95 transform">回复</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { NInput } from 'naive-ui';
    import CommentBox from './commentBox.vue';

    const data = {
        followStatus : true
    }

    const commentData = {
        title : "黑神话悟空的序章剧情90%是这个"
    }

    const value = "hello"
</script>
<style lang="less" scoped>
    input-focus-border:focus{
        outline: 1px solid @color-bottom-blue;
        border-radius:4px;
        // outline : 1px solid @color-gray
    }   
</style>