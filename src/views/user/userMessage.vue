<template>
    <div class="flex w-4/5 flex-col justify-between border-e rounded-lg m-auto">
        
        <div class="px-4 py-2 flex flex-row bg-white mt-4 rounded-lg">
            
            <ul class="mt-6 space-y-1 w-1/5">
                <div class="w-full font-bold px-4 py-2 text-lg">消息列表</div>
                <li>
                    <div @click="navChange('Space')" :class="(activeNav === 'Space') && 'nav-active'" class="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 cursor-pointer">
                        动态
                    </div>
                </li>

                <li>
                    <div @click="navChange('Channel')" :class="(activeNav === 'Channel') && 'nav-active'" class="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 cursor-pointer">
                        校园频道
                    </div>
                </li>

            </ul>


            <div class=" border-l ml-2 sticky inset-x-0 bottom-0  border-gray-100 w-full overflow-y-scroll h-screen max-h-70 scroll-hide px-10 pt-10">
                <userMessageSpace v-show="(activeNav=== 'Space')" :spaceMessage="spaceMessageList" @spaceTrigger="spaceTriggerHandle"/>
                <userMessageChannel v-show="(activeNav === 'Channel')" :channelMessage="channelMessageList"/>
            </div>
        </div>
        
        <router-view :key="new Date().getTime()"></router-view>

    </div>
</template>

<script setup lang="ts">
    import { router } from "@/router";
    import {ref, onMounted} from "vue";
    import userMessageSpace from "./userMessageSpace.vue";
    import userMessageChannel from "./userMessageChannel.vue";
    import {SpaceMessageType, ChannelMessageType} from "@/typings";
    import {bringSpaceMessageAPI} from "@/api/space"
    import {bringChannelMessageAPI} from "@/api/channel"
    import { useRoute } from "vue-router";
    import * as general from "@/utils/general"
    
    type NavType = "Space" | "Channel";
    const activeNav = ref<NavType>("Space");
    const spaceMessageList = ref<Array<SpaceMessageType>>([]);
    const channelMessageList = ref<Array<ChannelMessageType>>([]);
    const route = useRoute();

    onMounted(() => {
        navResutHandle();
    })

    const navChange = (type : NavType) =>
    {
        activeNav.value = type;
        navResutHandle()
    }

    const navResutHandle = async () =>
    {
        switch(activeNav.value)
        {
            case "Space":
                spaceMessageList.value = await bringSpaceMessageAPI() as unknown as Array<SpaceMessageType>;
                console.log(spaceMessageList.value)
                break;
            case "Channel":
                channelMessageList.value = await bringChannelMessageAPI() as unknown as Array<ChannelMessageType>;
                break;
        }    
    }

    const spaceTriggerHandle = (spaceId : number) =>
    {
        // router.push({
        //     path : `/space/${spaceId}`
        // })
        router.push({
            path: `${route.fullPath}/${spaceId}`
        })
    }

</script>
<style lang="less" scoped>
    .nav-active{
        background-color: #f3f4f6;
        color: rgba(55, 65, 81, 1);
    }
    .max-h-70{
        max-height: 70vh;
    }
</style>