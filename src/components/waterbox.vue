<!-- <template>
    <div>
        <div class="w-full min-h-3/4  rounded-lg bg-green-400 cursor-pointer 
                transform hover:scale-105 transition duration-50
                border-2 hover:border-blue-300 hover:bg-white
            " 
            :class="'h-' + props.height"  
            @click="openSpace"
        ></div>
        <div class="flex flex-col gap-y-2">
            <div class="text-gray-700 px-4 text-sm cursor-pointer " @click="openSpace">{{ props.title }}</div>
            <div class="flex justify-between px-4">
                <div class="flex flex-row gap-x-2 items-center">
                    <div class="h-4 w-4 rounded-full bg-gray-400 cursor-pointer"></div>
                    <div class="text-gray-400 text-xs">username</div>
                </div>
                <div class="cursor-pointer flex items-center">
                    <Icon color="gray">
                        <HeartOutline/>
                    </Icon>
                    <div class="text-xs text-gray-300">1000+</div>
                </div>
            </div>
        </div>
    </div>
</template> -->

<template>
    <div @click="openSpace">
        <!--
        Heads up! 👋

        This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
        -->

        <article class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm cursor-pointer" v-if="props.spaceDetail">
            <img
                alt=""
                :src="props?.spaceDetail?.headImage || 'https://oss.ptu.edu.cn/fileApi/my-bucket/12fcf65315994eaabc2b1d683a06ead3.png'"
                class="h-56 w-full object-cover"
            />

            <div class="p-4 sm:p-6">
                <a href="#">
                <h3 class="text-lg font-medium text-gray-900">
                    {{ props.spaceDetail.title || 'Title' }}
                </h3>
                </a>

                <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    <div v-html="outerInfo"></div>
                </p>

                <div class="text-gray-400 text-sm mt-2 flex flex-col gap-y-1">
                    <div class="flex flex-row items-center gap-x-2">
                        <img :src="general.headImg(props.spaceDetail.avatarURL)" class="h-4 w-4 bg-gray-400 rounded-full"/>
                        <div >{{ props.spaceDetail.nickname }}</div>
                    </div>
                    <div class="flex flex-row justify-between gap-x-2 flex-wrap">
                        <div>发布时间 : {{ general.timeFormatter(props.spaceDetail.publishTime) }}</div>
                        <div>类型 : {{ props.spaceDetail.typeName || "未知" }}</div>
                    </div>
                </div>
                
            </div>
        </article>
    </div>
</template>

<script setup lang="ts">
    import { SpaceInfo } from "@/typings";
    import {HeartOutline} from "@vicons/ionicons5";
    import { Icon } from "@vicons/utils";
    import { onMounted, ref } from "vue";
    import * as general from "@/utils/general";
import Vditor from "vditor";

    interface Props {
        spaceDetail : SpaceInfo
    }
    interface Emit{
        (ev : "openSpace", spaceId? : number ) : void
    }

    const props = defineProps<Props>();
    const outerInfo = ref<string>("");
    const emit = defineEmits<Emit>();

    const md2html = async (text : string) =>
    {
        return await Vditor.md2html(text, {cdn : "/cdn", mode : "light"});
    }

    const openSpace = () =>
    {
        emit("openSpace", props.spaceDetail.id);
    }

    onMounted(async () =>
    {
        outerInfo.value = await md2html(textOverflow(props.spaceDetail.outerInfo!) || 'no text');
    })

    const textOverflow = (text  :string) =>
    {
        if(!text)   return "";
        let length = 160;
        return text.length > length ? text.slice(0, length) + '...' : text;
    }

</script>
    
<style lang="less" scoped>

</style>