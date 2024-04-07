<template >
    <div class="w-3/4 my-auto mx-auto ">
        <!-- channel hot -->
        <div class="py-6 px-6 mt-4 bg-white h-full rounded-lg">
            <div class="flex items-center gap-x-2">
                <div class="w-4 h-4 bg-green-400 rounded-full"></div>
                <div class="text-lg font-bold">热门</div>
            </div>
            <!-- channel-hot-box -->
            <div class="pt-4 flex overflow-x-hidden gap-x-16 gap-y-4 flex-wrap">
                <div class="flex flex-row gap-2 cursor-pointer" 
                    v-for="(item, index) in hotData" :key="index"
                    @click="jump2ChannelPage(item?.name!)"
                >
                    <img class="w-20 h-20 bg-gray-400 rounded-lg active:scale-95 transform" :src="general.headImg(item.imgURL)" />
                    <div class="flex flex-col gap-y-1">
                        <div>{{ item?.name }}</div>
                        <div class="flex gap-1 items-center text-gray-400">
                            <!-- <div class="w-4 h-4 bg-gray-400"></div> -->
                            <Icon :size="16">
                                <People/>
                            </Icon>
                            <div class="text-gray-400 text-xs">{{ value2Thousand(item?.follow) || 0 }}</div>
                        </div>
                        <div class="flex gap-1 items-center text-gray-400">
                            <!-- <div class="w-4 h-4 bg-gray-400"></div> -->
                            <Icon :size="16">
                                <ChatboxEllipses/>
                            </Icon>
                            <div class="text-gray-400 text-xs">{{ value2Thousand(item?.itemNumber) || 0 }}</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="flex flex-row gap-x-4 pt-4">
            <!-- user channel -->
            <LeftNavigation class="w-1/4 bg-white rounded-lg"/>
            <!-- recommand channel -->
            <RightNavigation class="w-3/4 bg-white rounded-lg"/>
        </div>

        <div class="fixed bottom-32 right-16 text-4xl text-white w-12 h-12 bg-blue-500 text-center rounded-full cursor-pointer" @click="createChannelHandle()">+</div>
        <div class="fixed bottom-12 right-16 text-2xl  w-12 h-12  text-center rounded-full border  flex items-center justify-center shadow-sm cursor-pointer" @click="BackToTop">
            <Icon :size="30">
                <ArrowUp/>
            </Icon>
        </div>

        <n-modal v-model:show="showNewChannel">
            <ChannelCreate/>
        </n-modal> 
    </div>
</template>
<script setup lang="ts">
    import LeftNavigation from "./leftNavigation.vue";
    import RightNavigation from "./rightNavigation.vue";
    import {Icon} from "@vicons/utils";
    import {ArrowUp, People, ChatboxEllipses, Clipboard, DocumentText} from "@vicons/ionicons5";
    import { onMounted, ref } from "vue";
    import { NModal } from "naive-ui";
    import ChannelCreate from "./channelCreate.vue";
    import { bringAllChannelAPI, bringChannelHotAPI } from "@/api/channel";
    import { ChannelInfo } from "@/typings";
    import * as general from "@/utils/general";
import { useRouter } from "vue-router";

    let hotBox = [
        {
            channelName : "口袋妖怪",
            member : 365,
            comment : 12456743
        },
    ];

    const showNewChannel = ref(false);
    const hotData = ref<Partial<ChannelInfo>>({});
    const router = useRouter();

    onMounted(async () =>
    {
        let ret = await bringChannelHotAPI();
        hotData.value = ret as unknown as Partial<ChannelInfo>;
        console.log(hotData.value)
    })

    for(let i = 0; i < 11; i++)
    {
        hotBox.push(hotBox[0]);
    }

    const value2Thousand = ( value : number) =>
    {
        
        return (value > 10000) ?   (value / 1000).toFixed(1) + 'k' : value; 
    }

    const BackToTop = () =>
    {
        document.querySelector(".top")?.scrollIntoView({behavior : "smooth"});
    }

    const createChannelHandle = () =>
    {
        showNewChannel.value = true;
    }

    const jump2ChannelPage = (channelTitle : string) =>
    {
        router.push({
            path : "/channelPage/" + channelTitle
        })
    }

</script>
<style lang="less" scoped>
    
</style>