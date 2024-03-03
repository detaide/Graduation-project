<template>
    <div class="w-full h-full flex justify-center">

        <div id="vditor"></div>

    </div>
</template>
<script setup lang='ts'>
    import Vditor from "vditor";
    import "vditor/dist/index.css";
    import {ref, onMounted} from "vue";
    // const VDITOR_CDN = import.meta.env.VITE_VDITOR_CDN;

    const vditor  = ref();

    onMounted(async () =>
    {
        vditor.value = new Vditor("vditor", {
            height : "70vh",
            width : "90vw",
            mode : "sv",
            preview: {
                markdown: {
                    autoSpace: true
                },
                mode : "both",
                hljs : {
                    enable : true
                }
            },
            upload : {
                accept : 'image/*',
                url : "/img_temp"
            },
            toolbarConfig : {
                // hide : true,
                
            },
            image : {
                isPreview : true,
            },
            cdn: "/cdn", 
        });

    })


</script>
    
<style lang="less" scoped>
</style>