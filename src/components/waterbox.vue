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

        <article class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm" v-if="props.spaceDetail">
            <img
                alt=""
                :src="props?.spaceDetail?.headImage || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'"
                class="h-56 w-full object-cover"
            />

            <div class="p-4 sm:p-6">
                <a href="#">
                <h3 class="text-lg font-medium text-gray-900">
                    {{ props.spaceDetail.title || 'Title' }}
                </h3>
                </a>

                <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {{ props.spaceDetail.outerInfo || 'Info' }}
                </p>

                <a href="#" class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                Find out more

                <span aria-hidden="true" class="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                </span>
                </a>
            </div>
        </article>
    </div>
</template>

<script setup lang="ts">
    import { SpaceInfo } from "@/typings";
import {HeartOutline} from "@vicons/ionicons5";
    import { Icon } from "@vicons/utils";
import { onMounted } from "vue";

    interface Props {
        spaceDetail : SpaceInfo
    }
    interface Emit{
        (ev : "openSpace", spaceId? : number ) : void
    }

    const props = defineProps<Props>();

    const emit = defineEmits<Emit>();

    const openSpace = () =>
    {
        emit("openSpace", props.spaceDetail.id);
    }

    onMounted(() =>
    {

    })

</script>
    
<style lang="less" scoped>

</style>