<template>
    <div class="flex h-full w-full flex-col justify-between border-e bg-white rounded-lg">
        <div class="w-3/5 p-4 m-auto" v-if="keyword">
            <Search @search="searchHandle" :keyword="keyword"/> 
        </div>
        <div class="px-4 py-6 flex flex-row">
            <ul class="mt-6 space-y-1 w-1/5">
                <li>
                    <div @click="navChange('User')" :class="(activeNav === 'User') && 'nav-active'" class="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 cursor-pointer">
                        用户
                    </div>
                </li>

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


            <div class="border-l ml-2 sticky inset-x-0 bottom-0  border-gray-100 w-full overflow-y-scroll h-screen max-h-600 scroll-hide px-10 pt-10">
                <UserSearch v-show="(activeNav=== 'User')":user-info="userInfoList"/>
                <SpaceSearch v-show="(activeNav === 'Space')" :all-space="spaceInfoList" @open-space="spaceHandle"/>
                <ChannelSearch v-show="(activeNav === 'Channel')" :channel-search="channelHomeData.channelSearch" :channel-item-search="channelHomeData.channelItemSearch"/>
            </div>
        </div>
        
        <router-view></router-view>

    </div>
</template>

<script setup lang="ts">
    import Search from "./searchComponent.vue";
    import {ref, onMounted} from "vue";
    import {searchSpaceAPI} from "@/api/space";
    import {searchUserAPI} from "@/api/userInfo";
    import {searchChannelAPI} from "@/api/channel";
    import { useRoute } from "vue-router";
    import UserSearch from "./userSearch.vue";
    import { ChannelCommentData, ChannelInfo, ItemType, SpaceInfo, UserMessage } from "@/typings";
    import SpaceSearch from "./spaceSearch.vue";
    import { router } from "@/router";
    import ChannelSearch from "./channelSearch.vue";
    

    type NavType = "User" | "Space" | "Channel";

    const activeNav = ref<NavType>("User");
    const keyword = ref<string>("");
    const route = useRoute();
    const userInfoList = ref<Array<Partial<UserMessage>>>([]);
    const spaceInfoList = ref<Array<SpaceInfo>>([]);
    const channelHomeData = ref<{
        channelItemSearch? : Array<ChannelCommentData>,
        channelSearch? : Array<ChannelInfo>
    }>({});
        

    const searchHandle = (keywords : string) =>
    {
        keyword.value = keywords;
        navResutHandle()
    }

    const navChange = (type : NavType) =>
    {
        activeNav.value = type;
        navResutHandle()
    }

    
    onMounted(() => {
        keyword.value = route.params.keyword as string;
        navResutHandle();

    })

    const navResutHandle = async () =>
    {
        switch(activeNav.value)
        {
            case "User":
                userInfoList.value = await searchUserAPI(keyword.value) as unknown as Array<Partial<UserMessage>>;
                break;
            case "Space":
                let spaceListRet = await searchSpaceAPI(keyword.value) as unknown as Array<SpaceInfo>;
                spaceInfoList.value = await spaceDataFormatter(spaceListRet);
                break;
            case "Channel":
                channelHomeData.value = await searchChannelAPI(keyword.value) as unknown as typeof channelHomeData.value; 
                break;
        }    
    }

    const spaceDataFormatter = async (spaceInfo  : Array<SpaceInfo>) =>
    {
        let newList : Array<SpaceInfo> = [];
        const regex = /!\[alt text\]\((http:\/\/[^)]+)\)/g;
        const singleRegex = /!\[alt text\]\((http:\/\/[^)]+)\)/;

        spaceInfo.forEach((item) => {
            let info = item.info;
            console.log(info)
            let matchInfo = info.match(regex) || [];
            if(matchInfo)
            {
                let headImg = matchInfo[0]?.match(singleRegex);
                newList.push({
                    ...item,
                    headImage : headImg![1],
                    outerInfo : info.replace(regex, ""),
                })
            }
        })

        return newList;
    }

    const spaceHandle = (spaceId? : number) =>
    {
        router.push({
            path: `${route.fullPath}/space/${spaceId}`
        })
    }
</script>

<style lang="less" scoped>
    .nav-active{
        background-color: #f3f4f6;
        color: rgba(55, 65, 81, 1);
    }
    .max-h-600{
        max-height: 600px;
    }
</style>