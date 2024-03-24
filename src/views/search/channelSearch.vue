<template >
    <div>
        <div class="text-lg font-bold">频道搜索结果</div>
        <!-- channel -->
        <div v-show="props.channelSearch?.length" class="pt-4 flex overflow-x-hidden gap-x-16 gap-y-4 flex-wrap">
            <div class="flex flex-row gap-2 cursor-pointer" 
                v-for="(item, index) in props.channelSearch" :key="index"
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
        <div v-show="!props.channelSearch?.length" class="w-full text-gray-600 text-center">
            空空如也...
        </div>
        
        <div class="gap-line"></div>

        <!-- channelItem -->
        <div class="text-lg font-bold pb-4">帖子搜索结果</div>
        <div v-show="props.channelItemSearch?.length" class="px-2 flex flex-col gap-8">
            <ChannelHomeBox class="px-6" v-for="(item, index) in props.channelItemSearch" :key="index" :channel-item-data="item"/>
        </div>
        <div v-show="!props.channelItemSearch?.length" class="w-full text-gray-600 text-center">
            空空如也...
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ChannelCommentData, ChannelInfo, ItemType } from '@/typings';
    import * as general from "@/utils/general";
    import { useRouter } from 'vue-router';
    import {Icon} from "@vicons/utils";
    import {ArrowUp, People, ChatboxEllipses, Clipboard, DocumentText} from "@vicons/ionicons5";
    import ChannelHomeBox from "@/views/channel/channelHomeBox.vue";

    const props = defineProps<{
        channelItemSearch? : Array<ChannelCommentData>,
        channelSearch? : Array<ChannelInfo>
    }>();

    const router = useRouter();

    const jump2ChannelPage = (channelTitle : string) =>
    {
        router.push({
            path : "/channelPage/" + channelTitle
        })
    }

    const value2Thousand = ( value : number) =>
    {
        
        return (value > 10000) ?   (value / 1000).toFixed(1) + 'k' : value; 
    }

</script>
<style lang="less" scoped>
    
</style>