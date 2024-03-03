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
                    v-for="(item, index) in hotBox" :key="index"
                >
                    <div class="w-20 h-20 bg-gray-400 rounded-lg active:scale-95 transform"></div>
                    <div class="flex flex-col gap-y-1">
                        <div>{{ item.channelName }}</div>
                        <div class="flex gap-1 items-center">
                            <div class="w-4 h-4 bg-gray-400"></div>
                            <div class="text-gray-400 text-xs">{{ value2Thousand(item.member) }}</div>
                        </div>
                        <div class="flex gap-1 items-center">
                            <div class="w-4 h-4 bg-gray-400"></div>
                            <div class="text-gray-400 text-xs">{{ value2Thousand(item.comment) }}</div>
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

    </div>
</template>
<script setup lang="ts">
    import LeftNavigation from "./leftNavigation.vue";
    import RightNavigation from "./rightNavigation.vue";

    let hotBox = [
        {
            channelName : "口袋妖怪",
            member : 365,
            comment : 12456743
        },
    ];

    for(let i = 0; i < 11; i++)
    {
        hotBox.push(hotBox[0]);
    }

    const value2Thousand = ( value : number) =>
    {
        
        return (value > 10000) ?   (value / 1000).toFixed(1) + 'k' : value; 
    }
</script>
<style lang="less" scoped>
    
</style>