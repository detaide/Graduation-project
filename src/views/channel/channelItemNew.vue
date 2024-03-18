
<template>
    <form ref="formRef">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">新建帖子</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">分享你的新鲜事.</p>
  
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div class="col-span-full">
              <label for="first-name" class="block text-sm leading-6 text-gray-900 font-bold">帖子标题</label>
              <div class="mt-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="about" class="block text-sm font-medium leading-6 text-gray-900">内容</label>
              <div class="mt-2">
                <textarea id="about" name="about" rows="6" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>

              <div class="flex flex-col gap-x-4  justify-center mt-4">
                <div class="w-24 h-24 flex flex-col border border-gray-400 justify-center items-center  rounded-lg border-dotted" @click="photoUpload">
                    <label for="file-upload" class="text-blue-600">
                        <span>上传图片</span>
                        <input type="file" ref="fileInputRef" style="display: none;" multiple>
                    </label>
                    <p class="pl-1 text-xs text-gray-400">或者拖拽图片到这里</p>
                </div>
                <div ref="imgRegionRef" class="w-full flex flex-row gap-4 mt-4 flex-wrap">

                </div>
              </div>
            </div>
  
          </div>
        </div>
  
  
      </div>
  
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">取消</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">保存</button>
      </div>
    </form>
  </template>
  
<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    const fileInputRef = ref<HTMLInputElement>();
    const fileImg = ref<string>('');
    const formRef = ref<HTMLFormElement>();
    const imgRegionRef = ref<HTMLDivElement>();

    const channelItemInfo = ref({
        title : '',
        content : '',
        avatarFile : '',
        avatarURL : ''
    })

    onMounted(() =>
    {
        
        formRef.value?.addEventListener("submit", async (event) =>
        {
            
            // verifySubmit();
            event.preventDefault();
            console.log(channelItemInfo.value)

        })

        fileInputRef.value?.addEventListener("change", () =>
        {
            const files =  fileInputRef.value?.files;
            
            
            for(let i = 0; i < (files as FileList)?.length; i++)
            {
                const reader = new FileReader();
                reader.onload = (e) =>
                {
                    let newImgDom = document.createElement('img');
                    
                    newImgDom.src = e.target?.result as string;
                    imgRegionRef.value?.appendChild(newImgDom);
                    newImgDom.classList.add("new_img_dom");
                    console.log(newImgDom);
                }
                reader.readAsDataURL(files?.item(i) as Blob);
            }
            
        })

    })

    const photoUpload = () =>
    {
        fileInputRef.value?.click();
    }

</script>

<style lang="less">
    @import url("@/styles/global.less");

    .red-text{
        color: red;
    }

    .new_img_dom
    {
        max-width: 16rem !important;
        max-height: 12rem !important;
    }
</style>