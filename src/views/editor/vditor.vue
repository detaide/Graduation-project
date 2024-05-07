<template>
    <div class="w-full h-full flex justify-center">

        <div id="vditor" ref="vditorRef"></div>
    </div>
</template>
<script setup lang='ts'>
    import Vditor from "vditor";
    import "vditor/dist/index.css";
    import {ref, onMounted, defineExpose} from "vue";
    import { uploadImg } from "@/api/file";
import { NumbersFilled } from "@vicons/material";
    // const VDITOR_CDN = import.meta.env.VITE_VDITOR_CDN;

    const vditor  = ref<Vditor>();
    const vditorRef = ref<HTMLDivElement>();
    const cacheId = "Vditor_Cache_01"
    const  templateValue = `商品名称：\n商品类型：\n成色：\n价格：\n联系方式：\n校区：\n描述：\n`

    onMounted(async () =>
    {
        vditor.value = await new Vditor(vditorRef?.value!, {
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
                url : "/cdn/image_temp",
                success: (editor, msg) => {
                    // 上传成功后的回调函数
                    console.log("msg :",msg, editor);
                },
                error: (msg) => {
                    // 上传失败后的回调函数
                    console.error(msg);
                },
                handler :async (files) => {
                    // console.log(files);
                    let fileNameList = await uploadImg<any[]>(files);

                    fileNameList.forEach((fileName : string) =>
                    {
                        insertVditor(`![alt text](${import.meta.env.VITE_GLOB_REMOTE_URL}/file/get_image/${fileName})`);
                    })

                    return 'true';
                },
            },
            toolbarConfig : {
                // hide : true,
                
            },
            image : {
                isPreview : true, 
            }, 
            cdn: "/cdn", 
            cache : {
                id : cacheId,
            }
        });

        

    })

    const insertVditor = (text : string) =>
    {
        vditor.value?.insertValue(text);
    }

    
    const getVditorValue = () =>
    {
        return vditor.value?.getValue();
    }

    const md2html = async (text : string) =>
    {
        return await Vditor.md2html(text, {cdn : "/cdn", mode : "light"});
    }

    const templateActive = () =>
    {
        if(vditor.value?.getValue())
        {
            window.confirm("当前输入框已有内容，是否使用模板覆盖？")
            {
                vditor.value?.setValue(templateValue);
            }
        }

        
    }

    defineExpose({
        getVditorValue,
        md2html,
        templateActive
    })

</script>
    
<style lang="less" scoped>
</style>