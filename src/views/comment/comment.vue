<template>
    <div class=" py-4 px-40 flex flex-row gap-x-10 h-full">
        <div class="fixed">
            <div class="w-52 bg-white h-5/6 rounded flex  flex-col color-deep-gray p-2">
            <div class="py-4 cursor-pointer flex flex-row items-center gap-x-2 nav-hover w-full rounded pl-6" @click="navChangeHandle(10)">
                <Icon size="20">
                    <HomeSharp/>
                </Icon>
                <div>今日动态</div>
            </div>
            <div class="w-3/4 mx-auto bg-gray-300 border-b-2"></div>
            <ul class="text-center w-full">
                <li v-for="(item,index ) in navList" :key="index" @click="navChangeHandle(+item.key as number)" class="p-4 cursor-pointer flex flex-row items-center  gap-x-2 nav-hover rounded pl-6">
                    <Icon size="20">
                        <!-- <HomeSharp/> -->
                        <component :is="item.component"></component>
                    </Icon>
                    <div>{{ item.value }}</div>
                </li>
            </ul>
            
        </div>
        </div>
        <div class="w-3/4  rounded px-4 py-4 ml-64 bg-white">
            <div class="h-8 flex flex-row items-center gap-x-4 text-center text-base text-gray-500 border-gray-300 border-b-2 ">
                <!-- <div class="text-focus cursor-pointer h-full text-hover">推荐</div> -->
                <div class="cursor-pointer h-full text-hover text-focus">动态列表</div>
            </div>
            <wc-waterfall :gap="14" :cols="3" class="px-6 py-6 w-full " v-show="allSpace && allSpace?.length">
                <WaterBox v-for="(item, index) in allSpace" :key="item.id" 
                    :spaceDetail="item"
                    class="py-2"
                    @open-space="openSpaceHandler"
                />
            </wc-waterfall>
            <div v-show="!allSpace || !allSpace?.length" class="w-full text-center py-12 text-lg text-gray-400">该模块尚未有人发布动态...</div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import {Icon} from "@vicons/utils";
    import {HomeSharp, GameController} from "@vicons/ionicons5";
    import {FiberNewOutlined, MoodSharp, MenuBookSharp, MovieCreationRound, MusicNoteFilled, HandshakeRound, ShoppingBagSharp} from '@vicons/material';
    import "wc-waterfall";
    import WaterBox from "@/components/waterbox.vue"
    import { onMounted, ref } from "vue";
    import { getAllSpaceInfoAPI, getSpaceType, getTodaySpaceAPI } from "@/api/space";
    import { SpaceInfo } from "@/typings";
    import { eventBus } from "@/utils/eventBus";
    import * as general from "@/utils/general";

    interface Emit{
        (ev : "openSpace", spaceId? : number) : void
    }

    eventBus.on("deleteSpace", (spaceId) =>
    {
        allSpace.value = allSpace.value.reduce((arr, item) =>
        {
            if(item.id != spaceId)
                arr.push(item)
            return arr;
        }, [] as typeof allSpace.value)
    })

    const navList = ref<Array<{[key : string] : string}>>([]);
    const allSpace = ref<Array<SpaceInfo>>([]);
    const heightList = [32, 36, 40, 44,56, 52, 72, 80, 96];
    const emit = defineEmits<Emit>();
    const iconfontMap : {[key : string] : any} = {
        100 : FiberNewOutlined,
        101 : HomeSharp,
        102 : MoodSharp,
        103 : GameController,
        104 : MenuBookSharp,
        105 : MovieCreationRound,
        106 : MusicNoteFilled,
        107 : HandshakeRound,
        108 : ShoppingBagSharp
    }

    const openSpaceHandler = (spaceId? : number) =>
    {
        emit("openSpace", spaceId);
    }

    onMounted(async () =>
    {
        let spaceTotalRet = await getAllSpaceInfoAPI<Array<SpaceInfo>>();
        allSpace.value = await spaceDataFormatter(spaceTotalRet);
        // console.log("allspacesss : ", allSpace.value)

        const spaceTypeList = await getSpaceType() as unknown as {[key : string] : string};

        for(let key in spaceTypeList)
        {
            navList.value.push({
                key : key,
                value : spaceTypeList[key],
                component : iconfontMap[key]
            })
        }
    })

    const spaceDataFormatter = async (spaceInfo  : Array<SpaceInfo>) =>
    {
        let newList : Array<SpaceInfo> = [];
        const regex = /!\[alt text\]\((http:\/\/[^)]+)\)/g;
        const singleRegex = /!\[alt text\]\((http:\/\/[^)]+)\)/;

        spaceInfo.forEach((item) => {
            let info = item.info;
            let matchInfo = info.match(regex) || [];
            // console.log("matchInfo",matchInfo)
            if(matchInfo && matchInfo.length)
            {
                let headImg = matchInfo[0]?.match(singleRegex);
                newList.push({
                    ...item,
                    headImage : headImg![1],
                    outerInfo : info.replace(regex, ""),
                })
            }else{
                newList.push({
                    ...item,
                    headImage : general.headImg(''),
                    outerInfo : info.replace(regex, ""),
                })
            }
        })

        return newList;
    }

    const navChangeHandle = async (type? : number) =>
    {
        let ret = [];

        if(type == 10)
        {
            ret =  await getTodaySpaceAPI() as unknown as Array<SpaceInfo>;
        }else{
            ret =  await getAllSpaceInfoAPI(type) as unknown as Array<SpaceInfo>;
        }

        // eventBus.emit("navChange", type);
        // let ret =  await getTodaySpaceAPI() as unknown as Array<SpaceInfo>;

        allSpace.value = await spaceDataFormatter(ret);
    }
</script>
    
<style lang="less" scoped>
    
    .text-focus{
        color: @color-gray-2;
        position: relative;
    }
    .text-focus::before{
        position: absolute;
        content: '';
        width: 60%;
        height: 3px;
        bottom: -2px;
        background-color: @color-blue;
        left: 50%;
        transform: translate(-50%, 0);
        border-radius: 20px;
    }
    .text-hover:hover{
        position: relative;
        color: @color-blue;
    }
    

    
    
</style>