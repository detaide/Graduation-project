<template >
    <div>
        <div class="h-full flex flex-row gap-x-4 cursor-pointer">
            <!-- img -->
            <div class="w-20 h-20 bg-gray-400 rounded-lg min-w-20 min-h-20"></div>
            <!-- comment -->
            <div class="w-5/6">
                <div class="text-base text-gray-600 font-bold underline" @click="jump2ChannelPage(data.channelName)">{{ data.channelName }}</div>
                <div class="text-blue-500 text-base" @click="jump2ChannelInfo(123)">{{ textOverflow(data.commentTitle, 'title') }}</div>
                <div class="text-gray-400" @click="jump2ChannelInfo(123)" >{{ textOverflow(data.commentMemo, "text") }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { router } from "@/router";


    const overflowTextNumber = 150;
    const overflowTitleNumber = 20;
    const data = 
        {
            channelName : "口袋妖怪",
            commentTitle : "关于“天命人”的个人看法",
            commentTotal : 12,
            commentMemo : `首先，我的核心论点是游科的一句话“踏上取经路比抵达灵山更重要”。
其次，纯粹个人观点，如有雷同，纯属巧合。
众所周知，西游记原著中土地公的设定是消息灵通，指引道路的使者。黑神话世界里可能稍作改动，指引天命人是各路土地公的使命，所以PV2里人头鸟土地公即使很不情愿，依旧冒雪前来接引主角小猴子。最关键的是，这里他直呼小猴子为“天命人”，所以这个时候，主角已经是“天命人”了。回到PV1，目前出现的唯二的土地公，他可能只是单纯看到一只小猴子误入妖怪大本营，想帮助他指引一条生路，这里主角还不是天命人。那主角是什么时候成为天命人的呢？没错，正是在观音禅院，从他真正开始杀死大妖，正式踏上取经路那一刻起，他就成为了“天命人”。`
        }

        const textOverflow = (text  :string, type : "title" | "text") =>
        {
            let length = type === "title" ? overflowTitleNumber : overflowTextNumber;
            return text.length > length ? text.slice(0, length) + '...' : text;
        }

        const jump2ChannelPage = (channelTitle : string) =>
        {
            router.push({
                path : "/channelPage/" + channelTitle
            })
        }

        const jump2ChannelInfo = (channelId : number) =>
        {
            router.push({
                path : "/commentInfo/" + channelId
            })
        }
    
</script>
<style lang="less" scoped>
    
</style>