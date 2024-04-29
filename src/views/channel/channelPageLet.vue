<template >
    <div class="w-3/5 my-auto mx-auto">
        <div class="bg-white mt-4 relative">
            <div class="w-full h-40 bg-img"></div>
            <img class="absolute left-10 top-24 w-32 h-32 z-30 bg-gray-400 border-8 border-white" :src="channelData.imgURL" v-large-img/>
            <div class="bg-channel-color h-24 relative pt-2 ">
                <div class="absolute left-48 flex flex-col gap-y-2">
                    <div class="flex flex-row gap-4">
                        <div class="text-xl font-bold text-gray-600">{{ channelData.name }}</div>
                        <div class="text-sm w-16 py-1 bg-red-500 text-center text-white rounded-full font-bold cursor-pointer active:scale-95 transform">
                            <span v-show="!selfChannel && !channelData.userFollow" v-permission="() => followHandle(1)">关注</span>
                            <span v-show="!selfChannel && channelData.userFollow" v-permission="() => followHandle(2)">已关注</span>
                            <span v-show="selfChannel">吧主</span>
                        </div>
                        <div class="flex flex-row text-xs gap-x-4 text-gray-400 leading-loose">
                            <div> 关注 : <span class="text-red-400">{{ channelData.follow || 0 }}</span> </div>
                            <div> 帖数 :  <span class="text-red-400">{{ channelData.itemNumber || 0 }}</span></div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-x-2 items-center text-gray-400 text-base">频主 :
                        <img :src="general.headImg(channelData.avatarURL!)" class="w-4 h-4 rounded-full"/>
                        <div class=""> {{ channelData.nickname }}</div>
                    </div>
                   <div class="text-gray-400 text-base flex flex-row gap-x-20">
                        <div class="text-sm">简介 : {{ channelData.memo }}</div>
                        <div>类型 : {{ channelData.typeName }}</div>
                        
                   </div>
                </div>
            </div>

        </div>

        <ChannelPageComment v-if="channelData.id!" :channelId="channelData.id!" class="bg-white w-full mt-4"/>
        <!-- <ReplyEditor class="w-full h-52 rounded-b-lg"/> -->
        
        <div class="fixed bottom-32 right-16 text-4xl text-white w-12 h-12 bg-blue-500 text-center rounded-full cursor-pointer" @click="createChannelItemHandle()">+</div>
        <div class="fixed bottom-12 right-16 text-2xl  w-12 h-12  text-center rounded-full border  flex items-center justify-center shadow-sm cursor-pointer" @click="BackToTop">
            <Icon :size="30">
                <ArrowUp/>
            </Icon>
        </div>

        <n-modal v-model:show="showNewChannel">
            <ChannelCreate :channelId="channelData.id!"/>
        </n-modal> 
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import ChannelPageComment from "./channelPageComment.vue";
    import ReplyEditor from "./replyEditor.vue";
    import { addChannelScanNumberAPI, bringChannelDetailByNameAPI, followChannel } from "@/api/channel";
    import * as general from '@/utils/general';
    import {Icon} from "@vicons/utils";
    import {ArrowUp} from "@vicons/ionicons5";
    import { NModal } from "naive-ui";
    import ChannelCreate from "./channelCreate.vue";
import { useUserInfoStore } from "@/store/modules/userInfo";

    interface ChannelData
    {
        name : string,
        memo : string,
        nickname : string,
        imgURL : string,
        avatarURL : string,
        id : number,
        ownerId : number,
        scanNumber : number,
        type : number,
        typeName : string,
        follow : number,
        itemNumber : number,
        userFollow : boolean
    }

    const route = useRoute();
    const channelData = ref<Partial<ChannelData>>({});
    const showNewChannel = ref(false);
    const selfChannel = ref(false);
    const userInfoStore = useUserInfoStore();

    const data = {
        channelName : "黑神话悟空",
        followStatus : false,
        followers : 1212312,
        commentNumber : 12541513,
        channelMemo : "黑神话悟空_黑神话_黑神话：悟空游戏社区",
        ChannelType : "单机游戏"
    }

    onMounted(async () =>
    {
        console.log(route.params)
        let channelName = route.params.channelName;
        let channelInfo = await bringChannelDetailByNameAPI(channelName as string) as unknown as typeof channelData.value;
        channelInfo.imgURL = general.headImg(channelInfo.imgURL as string);
        channelData.value = channelInfo ;
        console.log("channelInfo", channelInfo)
        await addChannelScanNumberAPI(+(channelInfo?.id!) as number);
        selfChannel.value = channelInfo.ownerId == userInfoStore.id;
    })

    const createChannelItemHandle = () =>
    {
        showNewChannel.value = true;
    }

    const BackToTop = () =>
    {
        document.querySelector(".top")?.scrollIntoView({behavior : "smooth"});
    }

    /**
     * 
     * @param type 1 : follow 2 : unfollow
     */
    const followHandle = async (type : number) =>
    {
        console.log("follow", type);
        let ret =  await followChannel(channelData.value.id!, type);
        window.message.success(ret);
        channelData.value.userFollow = type == 1;
    }
    


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
    .bg-img{
        background: url("@/assets/img/bak_1.jpg");
        // background-repeat: no-repeat;
        // background-size:cover;
        object-fit:fill;
    }

</style>