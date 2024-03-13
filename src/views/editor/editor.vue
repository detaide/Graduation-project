<template>
    <div class="px-20">
        <div class="w-full flex flex-row pt-4 px-4">
            <input placeHolder="请输入标题" class="w-5/6 h-16 px-4 text-xl font-bold input-focus-border mb-2"/>
            <div 
                class="ml-4 text-center text-white text-3xl bg-blue-500 w-1/12 h-16 leading-loose active:scale-95 transform cursor-pointer rounded-r-md"
                @click="publishSpace"
            >发布</div>
        </div>
        
        <Vditor ref="vditor"/>
        <div v-html="show"></div>
    </div>
</template>
<script setup lang='ts'>
    import { computed, onMounted, ref } from "vue";
    import Vditor from "./vditor.vue";

    interface vditorRef{
        getVditorValue? : () => any,
        md2html? : (md : string) => any,
    }

    const vditor = ref<vditorRef>({});
    const show = ref(null);

    const getVditorValue = computed(() =>
    {
        return vditor.value.getVditorValue!();
    })

    onMounted(() =>
    {
        console.log(vditor.value)
    })

    const publishSpace = async () =>
    {
        show.value = await vditor.value.md2html!(getVditorValue.value)
        
    }

</script>
    
<style lang="less" scoped>
    .input-focus-border:focus{
        outline: 1px solid @color-bottom-blue;
        border-radius:4px;
        // outline : 1px solid @color-gray
    }
</style>