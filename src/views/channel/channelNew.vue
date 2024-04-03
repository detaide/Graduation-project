
<template>
    <form ref="formRef">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">新建频道</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">请在此输入信息进行频道新建</p>
  
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div class="sm:col-span-3">
              <label for="channelName" class="block text-sm font-medium leading-6 text-gray-900">频道名称</label>
              <div class="mt-2">
                <input type="text" name="channelName" id="channelName" v-model="channelInfo.name" autocomplete="given-name" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="memo" class="block text-sm font-medium leading-6 text-gray-900">简介</label>
              <div class="mt-2">
                <textarea id="memo" name="memo" rows="3" v-model="channelInfo.memo" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">为您的频道添加简介.</p>
            </div>
  
            <div class="col-span-full">
              <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">头像</label>
              <div class="mt-2 flex items-center gap-x-3">
                <img alt="avatar" class="h-24 w-24 text-gray-300" :src="fileImg" v-show="fileImg"/>
                <PhotoIcon class="h-24 w-24 text-gray-300" aria-hidden="true" v-show="!fileImg"/>
                <input type="file" ref="fileInputRef" style="display: none;">
                <button type="button" @click="photoUpload" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
              </div>
            </div>
  
            <div class="col-span-3">
                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900 py-2">选择分类</label>
                <n-cascader
                    :options="categoryOptions"
                    v-model:value="channelInfo.type"
                    default-value="请选择分类"
                    label-field="whateverLabel"
                    value-field="whateverValue"
                    children-field="whateverChildren"
                    
                />
            </div>

            <div class="col-span-full">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                  <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
  
      </div>
  
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <!-- <button type="button" class="text-sm font-semibold leading-6 text-gray-900">取消</button> -->
        <button type="submit" v-permission="formSubmit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">保存</button>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
    import { createChannelAPI, getChannelTypeAPI } from '@/api/channel';
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
    import {NCascader} from "naive-ui";
    import { onMounted, ref } from 'vue';
    
    const demoRef = ref([]);

    const formRef = ref<HTMLFormElement>();
    const fileInputRef = ref<HTMLInputElement>();
    const fileImg = ref<string>('');
    const categoryOptions = ref<Array<any>>();
    const channelInfo = ref<{
        name? : string,
        memo? : string,
        type? : any,
        imgFile? : string,
    }>({});
    
    const formSubmit = async () =>
    {
      channelInfo.value.type = parseInt(channelInfo.value.type as string);
      console.log(channelInfo.value)
      return await createChannelAPI(channelInfo.value);
    }

    onMounted(async () =>
    {
        formRef.value?.addEventListener("submit", async (event) =>
        {
            
            // verifySubmit();
            event.preventDefault();
            // channelInfo.value.type = parseInt(channelInfo.value.type as string);
            // console.log(channelInfo.value)
            // return await createChannelAPI(channelInfo.value);

        })

        fileInputRef.value?.addEventListener("change", () =>
        {
            const file =  fileInputRef.value?.files?.[0]!;
            const reader = new FileReader();
            reader.onload = (e) =>
            {
                fileImg.value = e.target?.result as string;
                channelInfo.value.imgFile = fileImg.value;
            }
            reader.readAsDataURL(file);
        })

        let channelTypeMap = await getChannelTypeAPI() as any;
        let categoryList = [];
        

        for(let key in channelTypeMap)
        {
            let categorySubObj = {
                whateverLabel : '',
                whateverValue : '',
                whateverChildren : [] as {whateverLabel : string, whateverValue : string}[]
            };
            for(let subKey in channelTypeMap[key] as object)
            {
                if(subKey !== 'name')
                {
                    categorySubObj.whateverChildren.push({
                        whateverLabel : channelTypeMap[key][subKey],
                        whateverValue : subKey
                    });
                }else{
                    categorySubObj = {
                        ...categorySubObj,
                        whateverLabel : channelTypeMap[key][subKey],
                        whateverValue : key
                    }
                }

            }
            categoryList.push(categorySubObj);
        }
        categoryOptions.value = categoryList;
        console.log(categoryList)
    })

    const photoUpload = () =>
    {
        fileInputRef.value?.click();
    }

  </script>