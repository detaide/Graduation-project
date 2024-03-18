<template >
    <div>
        <div v-show="!userSpace || !userSpace.length" class="text-gray-500 text-lg w-full m-auto text-center pt-10">空空如也...</div>
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
    import { useRouter } from "vue-router";
    import "wc-waterfall";
    import UserInfo from "./userInfo.vue";
import { onMounted, ref } from "vue";
import { bringSpaceByUserIdAPI, getAllSpaceInfoAPI } from "@/api/space";
    import { useUserInfoStore } from "@/store/modules/userInfo";
    import { SpaceInfo } from "@/typings";

    const userSpace = ["登录","标题记录","我说这是一个标题","为哦什么","看起来是正确的","元始天尊","标题记录","我说这是一个标题","为哦什么","看起来是正确的","元始天尊"];
    const heightList = [32, 36, 40, 44,56, 52, 72, 80, 96];
    const router = useRouter();
    const userInfoStore = useUserInfoStore();
    const allSpace = ref<Array<SpaceInfo>>([]);
    
    const openSpaceHandler = (spaceId? : number) =>
    {
        router.push("/user/userSpace/" + spaceId);
    }

    onMounted(async () =>
    {
        const regex = /!\[alt text\]\((http:\/\/[^)]+)\)/;
        let spaceTotalRet = await getAllSpaceInfoAPI<Array<SpaceInfo>>();
        let newList : Array<SpaceInfo> = [];
        spaceTotalRet.forEach((item) => {
            let info = item.info;
            let matchInfo = info.match(regex);
            if(matchInfo)
            {
                newList.push({
                    ...item,
                    headImage : matchInfo[1],
                    outerInfo : info.replace(regex, ""),
                })
            }
        })
        allSpace.value = newList;
    })
</script>
<style lang="less" scoped>
    
</style>