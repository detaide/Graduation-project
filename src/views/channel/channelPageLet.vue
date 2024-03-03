<template >
    <div class="w-3/5 my-auto mx-auto">
        <div class="bg-white mt-4 relative">
            <div class="w-full h-40 color-linear"></div>
            <div class="absolute left-10 top-24 w-32 h-32 z-30 bg-gray-400 border-8 border-white"></div>
            <div class="bg-channel-color h-24 relative pt-2 ">
                <div class="absolute left-48 flex flex-col gap-y-2">
                    <div class="flex flex-row gap-4">
                        <div class="text-xl font-bold text-gray-600">{{ data.channelName }}</div>
                        <div class="text-sm w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform">
                            <span v-show="!data.followStatus">关注</span>
                            <span v-show="data.followStatus">已关注</span>
                        </div>
                        <div class="flex flex-row text-xs gap-x-4 text-gray-400 leading-loose">
                            <div> 关注 : <span class="text-red-400">{{ data.followers }}</span> </div>
                            <div> 帖数 :  <span class="text-red-400">{{ data.commentNumber }}</span></div>
                        </div>
                    </div>
                   <div class="text-gray-400 text-base flex flex-row gap-x-20">
                        <div class="">{{ data.channelMemo }}</div>
                        <div>类型 : {{ data.ChannelType }}</div>
                   </div>
                </div>
            </div>

        </div>

        <ChannelPageComment class="bg-white w-full "/>
        <ReplyEditor class="w-full h-52 rounded-b-lg"/>
        
    </div>
</template>
<script setup lang="ts">
    import { onMounted } from "vue";
    import { useRoute } from "vue-router";
    import ChannelPageComment from "./channelPageComment.vue";
    import ReplyEditor from "./replyEditor.vue";
    const route = useRoute();

    const data = {
        channelName : "黑神话悟空",
        followStatus : false,
        followers : 1212312,
        commentNumber : 12541513,
        channelMemo : "黑神话悟空_黑神话_黑神话：悟空游戏社区",
        ChannelType : "单机游戏"
    }

    onMounted(() =>
    {
        // console.log(route.params)
    })
    


</script>
<style lang="less" scoped>
    @import url("@/styles/global.less");

    .bg-channel-color{
        background-color: @color-channel-bg-color;
    }

    .color-linear
    {
        background: linear-gradient(45deg, orange, skyblue);
    }

</style>