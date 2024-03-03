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
                <img class="space-background-img bg-img h-full w-1/2 " src="../assets//img/avatar.jpg"/>

                <!-- </div> -->
                <div class="h-full w-1/2 bg-white px-2 py-4">
                    <SpaceInfo/>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
    import { ref } from "vue";
    import SpaceInfo from "./spaceInfo.vue";
    import { useRouter } from "vue-router";


    const maskInner = ref(null);
    const router = useRouter();

    const maskHandler = (dom : any) =>
    {
        if(!dom.contains(maskInner.value))
            return;
        router.back();
    }
</script>
    
<style lang="less" scoped>

    @import url("@/styles/global.less");
    .space-background-img{
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        // max-width: 25rem;
    }
    .bg-img{
        background-image: url(../assets//img/avatar.jpg);
    }
    .max-vh{
        max-height: 100vh;
    }
</style>