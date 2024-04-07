<template >
    <div>
        <div v-show="!allSpace || !allSpace.length" class="text-gray-500 text-lg w-full m-auto text-center pt-10">空空如也...</div>
        <wc-waterfall :gap="14" :cols="3" class="px-6 py-6 w-full ">
                <WaterBox v-for="(item, index) in allSpace" :key="index" 
                    :height="heightList[Math.floor(Math.random() * heightList.length)]"
                    :spaceDetail="item"
                    class="py-2"
                    @open-space="openSpaceHandler"
                />
            </wc-waterfall>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
    import WaterBox from "@/components/waterbox.vue";
    import { useRoute, useRouter } from "vue-router";
    import "wc-waterfall";
    import UserInfo from "./userInfo.vue";
import { onMounted, ref } from "vue";
import { bringAppSpaceByUserIdAPI, bringSpaceByFollow, bringSpaceByUserIdAPI, getAllSpaceInfoAPI } from "@/api/space";
    import { useUserInfoStore } from "@/store/modules/userInfo";
    import { SpaceInfo } from "@/typings";

    const userSpace = [];
    const heightList = [32, 36, 40, 44,56, 52, 72, 80, 96];
    const router = useRouter();
    const route = useRoute();
    const userInfoStore = useUserInfoStore();
    const allSpace = ref<Array<SpaceInfo>>([]);
    
    const openSpaceHandler = (spaceId? : number) =>
    {
        console.log(route)
        router.push({name : "userCollectionDetail", params : {spaceId : spaceId}});
    }

    const spaceDataFormatter = async (spaceInfo  : Array<SpaceInfo>) =>
    {
        let newList : Array<SpaceInfo> = [];
        const regex = /!\[alt text\]\((http:\/\/[^)]+)\)/g;
        const singleRegex = /!\[alt text\]\((http:\/\/[^)]+)\)/;

        spaceInfo.forEach((item) => {
            // console.log(item)
            let info = item.info;
            if(!info)
            {
                item.title='已失效';
                return;
            }
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

    onMounted(async () =>
    {
        let userId = +(route.params.userId as string);
        let spaceTotalRet = await bringSpaceByFollow<Array<SpaceInfo>>(userId);
        console.log(spaceTotalRet)
        allSpace.value = await spaceDataFormatter(spaceTotalRet);
    })
</script>
<style lang="less" scoped>
    
</style>