<template>
    <div class="absolute w-full h-full mask top-0 left-0 z-50 max-vh"
        @click="maskHandler($event.target)"
    >
        <div class="w-full h-full relative"
        >
            <div class="
                absolute left-1/5 top-10 bottom-10 w-3/5
                rounded-3xl
                flex flex-row
                bg-gray-200
                overflow-hidden
                "
                ref="maskInner"
            >
                <div class="w-1/2 flex items-center bg-gray-300">
                    <!-- <img class="space-background-img bg-img  w-full" :src="headImg"/> -->
                    <n-carousel
                        direction="horizontal"
                        dot-placement="bottom"
                        show-arrow
                        centered-slides
                        draggable
                    >
                        <n-carousel-item v-for="(item, index) in headImg" :key="index">
                            <img class="space-background-img bg-img  w-full"  :src="item" v-large-img/>
                        </n-carousel-item>
                    
                    </n-carousel>
                </div>

                <!-- </div> -->
                <div class="h-full w-1/2 bg-white px-2 py-4" v-if="Object.keys(spaceInfo).length">
                    <SpaceInfo :spaceInfo="spaceInfo" @deletSpace="deleteSpaceHandle"/>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import SpaceInfo from "./spaceInfo.vue";
    import { useRouter, useRoute } from "vue-router";
    import { bringSpaceDetailAPI, addSpaceScanNumberAPI, SpaceMessageCheckAPI } from "@/api/space";
    import { SpaceDetail } from "@/typings";
    import {SpaceInfo as SpaceInfoType} from "@/typings";
    import { eventBus } from "@/utils/eventBus";
    import {NCarousel, NCarouselItem} from "naive-ui"
    import {useUserInfoStore} from "@/store/modules/userInfo";

    const maskInner = ref(null);
    const defaultHeadImg = "https://oss.ptu.edu.cn/fileApi/my-bucket/12fcf65315994eaabc2b1d683a06ead3.png";
    const router = useRouter();
    const route = useRoute();
    const headImg = ref<Array<string>>([defaultHeadImg]);
    const spaceInfo = ref<Partial<SpaceInfoType>>({})
    const userInfoStore = useUserInfoStore();

    const deleteSpaceHandle = (spaceId? : number) =>
    {
        // maskHandler()
        eventBus.emit("deleteSpace", spaceId);
        router.back();
    }
        
    const maskHandler = (dom : any) =>
    {
        if(!dom.contains(maskInner.value))
            return;
        router.back();
    }

    onMounted(async () =>
    {
        // console.log( route.params.spaceId);
        let spaceDetailRet = await bringSpaceDetailAPI<SpaceDetail>(+(route.params.spaceId as string));
        let spaceDetailArticle = spaceDetailRet.article;
        await addSpaceScanNumberAPI(+(route.params.spaceId as string));
        let regex = /!\[alt text\]\((http:\/\/[^)]+)\)/g;
        const urlMatch = spaceDetailArticle.info?.match(regex);

        if(urlMatch)
        {
            headImg.value = [];
        }

        urlMatch?.forEach((item) =>
        {
            let subRegex = /!\[alt text\]\((http:\/\/[^)]+)\)/;
            let matchImg = item.match(subRegex)?.[1];
            matchImg && (headImg.value.push(matchImg))
        })

        // headImg.value = (urlMatch || [])[1] || defaultHeadImg;
        spaceInfo.value = spaceDetailArticle;
        // console.log("spaceInfo", spaceInfo.value, userInfoStore.id);
        if(userInfoStore.id && (spaceInfo.value?.userId == userInfoStore.id))
        {
            await SpaceMessageCheckAPI(+(route.params.spaceId as string) as number);
            console.log("check")
        }
        // 


    })

</script>
    
<style lang="less" scoped>

    @import url("@/styles/global.less");
    // .space-background-img{
    //     background-position: 50%;
    //     background-repeat: no-repeat;
    //     background-size: cover;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     // max-width: 25rem;
    // }
    // .bg-img{
    //     background-image: url(../assets//img/avatar.jpg);
    // }
    .max-vh{
        max-height: 100vh;
    }

    .n-carousel__slide{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .n-carousel__arrow{
        color: black !important;
    }
</style>