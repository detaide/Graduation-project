<template >
    <div class="py-4 px-6">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-2 items-center pr-10">
                <div class="w-4 h-4 bg-red-400 rounded-full"></div>
                <div>帖子列表</div>
            </div>
            <ChannelSearch/>
        </div>
        <div class="gap-line"></div>
        <div class="px-2 flex flex-col gap-8">
            <ChannelComment v-for="(item, index) in itemDataList" :key="index" :itemData="item"/>
        </div>

    </div>
</template>
<script setup lang="ts">
    import ChannelSearch from "./channelSearch.vue";
    import ChannelComment from "./channelCommentBox.vue";
    import { onMounted, ref } from "vue";
    import { bringChannelItemListAPI } from "@/api/channel";
import { ItemType } from "@/typings";

    

    const props = defineProps<{
        channelId? : number
    }>();

    const itemDataList = ref<Array<ItemType>>([]);
    
    onMounted(async () =>
    {
        let ret = await bringChannelItemListAPI(props.channelId || 0);
        itemDataList.value = ret as unknown as typeof itemDataList.value;
        console.log(ret);
    })

</script>
<style lang="less" scoped>
    
</style>