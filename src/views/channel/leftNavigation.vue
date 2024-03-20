<template >
    <div class="px-4 py-4">
        <div class="flex flex-row items-center gap-2 text-base font-bold pb-4">
            <div class="rounded-full w-4 h-4 bg-green-400"></div>
            <div>我的关注</div>
        </div>
        <div class="">
            
        </div>
        <div v-show="!love" class="w-full flex justify-center border rounded-lg">
            <div class="py-4 text-gray-400 " v-show="!followList.length">空空如也...</div>
            <div class="flex w-full flex-col gap-y-2">
                <div v-for="(item, index) in followList" :key="index" class="flex justify-start p-2 boredr border-gray-400 gap-x-2" @click="jump2channel(item.name)">
                    <img class="w-16 h-16 border bg-gray-400 rounded-lg" :src="general.headImg(item.imgURL)"/>
                    <div class="pt-1">
                        <div class="text-base">{{ item.name }}</div>
                        <div class="text-xs text-gray-400">
                            {{ item.memo }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="gap-line" v-show="love"></div>
    </div>
</template>
<script setup lang="ts">
    import { bringChannelFollowAPI } from '@/api/channel';
    import { onMounted, ref } from 'vue';
    import * as general from "@/utils/general";
    import { useRouter } from 'vue-router';

    const love = false;
    const followList = ref<Array<any>>([]);
    const router = useRouter()

    onMounted(async () =>
    {
        followList.value  =  await bringChannelFollowAPI() as unknown as Array<any>;
        console.log(followList.value)
    })

    const jump2channel = (channelName : string) =>{
        router.push({
            path : "/channelPage/" + channelName
        })
    }

</script>
<style lang="less" scoped>
    @import url("@/styles/global.less");
</style>