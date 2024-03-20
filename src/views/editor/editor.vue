<template>
    <div class="px-20">
        <div class="w-full flex flex-row pt-4 px-4">
            <n-cascader
            :options="categoryOptions"
            v-model:value="spaceType"
            default-value="请选择分类"
            label-field="key"
            value-field="value"
            children-field="child"
            class="w-64"
            :size="'large'"
        />
            <input placeHolder="请输入标题" class="w-5/6 h-16 px-4 text-xl font-bold input-focus-border mb-2" v-model="title"/>
            <div 
                class="ml-4 text-center text-white text-3xl bg-blue-500 w-1/12 h-16 leading-loose active:scale-95 transform cursor-pointer rounded-r-md"
                @click="publishSpace"
            >发布</div>
        </div>
        
        
        <Vditor ref="vditor"/>
        
    </div>
</template>
<script setup lang='ts'>
    import { computed, onMounted, ref } from "vue";
    import Vditor from "./vditor.vue";
    import { getSpaceType, publishSpaceAPI } from "@/api/space";
    import { openLoginModel } from "@/utils/general/loginModel";
    import { createDiscreteApi } from "naive-ui";
    import { useUserInfoStore } from "@/store/modules/userInfo";
    import {NCascader} from "naive-ui";

    interface vditorRef{
        getVditorValue? : () => any,
        md2html? : (md : string) => any,
    }

    const vditor = ref<vditorRef>({});
    const {message} = createDiscreteApi(["message"]);
    const title = ref("Hello");
    const spaceType = ref();

    // const getVditorValue = computed(() =>
    // {
    //     return vditor.value.getVditorValue!();
    // })

    const categoryOptions = ref<Array<any>>([]);

    onMounted(async () =>
    {

        let spaceTypeList = await getSpaceType() as unknown as {[key : string] : string};
        for(let key in spaceTypeList)
        {
            categoryOptions.value.push({
                key : spaceTypeList[key],
                value : key
            })
        }
        console.log(categoryOptions.value)
    })

    const VerifyPublish = () =>
    {
        if(title.value === "")
        {
            message.error("标题不能为空");
            return false;
        }

        if(vditor.value.getVditorValue!() === "")
        {
            message.error("内容不能为空");
            return false;
        }

        return true;
    }

    const publishSpace = async () =>
    {
        // let markdown =  await vditor.value.md2html!(getVditorValue.value)
        
        if(!VerifyPublish()) return;

        try{
            let res = await publishSpaceAPI({
                title : title.value,
                info : vditor.value.getVditorValue!(),
                type : spaceType.value
            });
            window.message.success("发布成功");
        }catch(err : any)
        {
            if(err.message === "Request failed with status code 401")
            {
                message.error("登录凭证过期");
                let userInfo = useUserInfoStore();
                userInfo.reLogin();
                return;
            }

            throw new Error(err.message);
            
        }
    }

</script>
    
<style lang="less">
    .input-focus-border:focus{
        outline: 1px solid @color-bottom-blue;
        border-radius:4px;
        // outline : 1px solid @color-gray
    }

    .n-cascader .n-base-selection-label{
        height: 4rem;
    }
</style>