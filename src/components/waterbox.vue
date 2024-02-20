<template>
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
</template>
<script setup lang="ts">
    import {HeartOutline} from "@vicons/ionicons5";
    import { Icon } from "@vicons/utils";

    interface Props {
        height : number | string,
        title : string
    }
    interface Emit{
        (ev : "openSpace", spaceId? : number ) : void
    }

    const props = defineProps<Props>();

    const emit = defineEmits<Emit>();

    const openSpace = () =>
    {
        emit("openSpace", Math.floor(Math.random() * 100));
    }

</script>
    
<style lang="less" scoped>

</style>