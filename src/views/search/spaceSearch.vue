<template >
    <div class="w-full h-full">
        <div class="text-lg font-bold pb-4">动态搜索结果</div>
        <wc-waterfall :gap="14" :cols="3" class="px-6 py-6 w-full " v-show="props.allSpace?.length">
            <WaterBox v-for="(item, index) in props.allSpace" :key="index" 
                :spaceDetail="item"
                class="py-2"
                @open-space="openSpaceHandler"
            />
        </wc-waterfall>
        <div v-show="!props.allSpace?.length" class="w-full text-gray-600 text-center">
            空空如也...
        </div>
    </div>
</template>
<script setup lang="ts">
    import { SpaceInfo } from '@/typings';
    import {ref, onMounted} from "vue";
    import "wc-waterfall";
    import WaterBox from "@/components/waterbox.vue"

    interface Emit{
        (ev : "openSpace", spaceId? : number) : void
    }

    const emit = defineEmits<Emit>();

    const openSpaceHandler = (spaceId? : number) =>
    {
        emit("openSpace", spaceId);
    }

    const props = defineProps<{
        allSpace : Array<SpaceInfo>
    }>();

    onMounted(() => {
        console.log(props.allSpace)
    })

</script>
<style lang="less" scoped>
    
</style>