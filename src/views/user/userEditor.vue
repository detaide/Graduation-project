<template >
    <div class="w-4/5 h-4/5">
        <section class="bg-gray-100 rounded-2xl">
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div class="lg:col-span-1 lg:py-12">
                <!-- <p class="max-w-xl text-lg">
                    请告诉我你的信息，介绍自己吧
                </p> -->
        
                <div class="mt-8">
                    <a href="#" class="text-2xl font-bold text-pink-600"> 请告诉我你的信息，介绍自己吧 </a>
        
                    <address class="mt-2 not-italic">Please tell me your information and introduce yourself</address>
                </div>
                </div>
        
                <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12 overflow-y-scroll h-screen max-h-800 scroll-hide">
                    <form ref="formRef">
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Infomation</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600">请在此编辑您的个人信息</p>

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-4">
                                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">用户名</label>
                                <div class="mt-2">
                                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input type="text" name="username" id="username" autocomplete="nickname" v-model="userMessage.nickname" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="nickname">
                                    </div>
                                </div>
                                </div>

                                <div class="col-span-full">
                                <label for="about" class="block text-sm font-medium leading-6 text-gray-900">简介</label>
                                <div class="mt-2">
                                    <textarea id="about" name="about" rows="3" v-model="userMessage.description" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                </div>
                                <p class="mt-3 text-sm leading-6 text-gray-600">我想知道您的个人介绍...</p>
                                </div>

                                <div class="col-span-full">
                                <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">头像</label>
                                <div class="mt-2 flex items-center gap-x-3">
                                    <!-- <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                    </svg> -->
                                    <img alt="avatar" class="h-12 w-12 text-gray-300 rounded-full" :src="fileImg">
                                    <input type="file" ref="fileInputRef" style="display: none;">
                                    <button type="button" @click="photoUpload" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                </div>
                                </div>

                                <!-- <div class="col-span-full">
                                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div class="text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                    </svg>
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" class="sr-only">
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                                </div> -->
                            </div>
                            </div>

                            <div class="border-b border-gray-900/10 pb-12">
                            <h2 class="text-base font-semibold leading-7 text-gray-900">个人资料</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600">请使用您的真实地址</p>

                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">姓</label>
                                <div class="mt-2">
                                    <input type="text" name="first-name" id="first-name" v-model="userMessage.firstName" utocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                                </div>

                                <div class="sm:col-span-3">
                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">名</label>
                                <div class="mt-2">
                                    <input type="text" name="last-name" id="last-name" autocomplete="family-name" v-model="userMessage.lastName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                                </div>

                                <div class="sm:col-span-4">
                                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">邮箱</label>
                                    <div class="mt-2">
                                        <input id="email" name="email" type="email" autocomplete="email" v-model="userMessage.email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">性别</label>
                                    <div class="mt-2">
                                        <select id="gender" name="gender" autocomplete="gender-name" v-model="userMessage.gender" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option value="1">男</option>
                                        <option value="2">女</option>
                                        <option value="9">我不想说</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="sm:col-span-3">
                                    <label for="birthday" class="block text-sm font-medium leading-6 text-gray-900">生日</label>
                                    <n-date-picker v-model:value="userMessage.birthday" type="date" />

                                </div>

                                <div class="sm:col-span-3">
                                    <label for="school" class="block text-sm font-medium leading-6 text-gray-900">校区</label>
                                    <div class="mt-2">
                                        <select id="school" name="school" autocomplete="school-name" v-model="userMessage.school" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <!-- <option value="new_west">紫霄校区西区</option>
                                        <option value="new_center">紫霄校区中区</option>
                                        <option value="old">学园校区</option>
                                        <option value="old-north">北区</option> -->
                                        <option v-for="(item, index) in Object.keys(SchoolLocation.schoolLocation)" :key="index" :value="item">{{ SchoolLocation.getSchoolLocation(item) }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-span-full">
                                <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">详细地址</label>
                                <div class="mt-2">
                                    <input type="text" name="street-address" id="street-address"  v-model="userMessage.address" autocomplete="street-address" class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                                </div>


                            </div>
                            </div>

                            <div class="border-b border-gray-900/10 pb-12">
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>
                            </div>
                        </div>

                        <div class="mt-6 flex items-center justify-end gap-x-6">
                            <!-- <button type="button" class="text-sm font-semibold leading-6 text-gray-900">取消</button> -->
                            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">保存</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
    import { userMessageSubmitAPI } from '@/api/userInfo';
import { useUserInfoStore } from '@/store/modules/userInfo';
import { UserMessage } from '@/typings';
import { NDatePicker, useMessage } from 'naive-ui';
    import { onMounted, reactive, ref } from 'vue';
    import * as chatManager from "@/utils/chat";
    import {SchoolLocation} from "@/typings";

    const formRef = ref<HTMLFormElement>();
    const fileInputRef = ref<HTMLInputElement>();
    const fileImg = ref<string>('');
    const userInfoStore = useUserInfoStore();
    const props = defineProps<{
        userId : number
    }>();
    
    let userMessage = ref<Partial<UserMessage>>({
        nickname : '',
        description : '',
        address : '',
        // avatarFile : null,
        firstName : '',
        lastName : '',
        gender : 2,
        email : '',
        school : '',
        avatarURL : '',
        birthday : new Date().getTime(),

    });

    onMounted(() =>
    {
        userMessage.value = userInfoStore.getUserDetail(); 
        // userMessage.value = Object.assign(userInfoStore.userDetail as UserMessage, userMessage.value);
        fileImg.value = userMessage.value.avatarURL!;
        formRef.value?.addEventListener("submit", async (event) =>
        {
            
            // verifySubmit();
            event.preventDefault();
            console.log(userMessage.value)
            await  userInfoStore.userMessageSubmitAPI(userMessage.value);
            let remoteStatus = await chatManager.syncUserInfo(userMessage.value);
            remoteStatus && window.message.success("聊天信息更新成功");
        })

        fileInputRef.value?.addEventListener("change", () =>
        {
            const file =  fileInputRef.value?.files?.[0]!;
            const reader = new FileReader();
            reader.onload = (e) =>
            {
                fileImg.value = e.target?.result as string;
                console.log(fileImg.value)
                userMessage.value.avatarFile = fileImg.value;
            }
            reader.readAsDataURL(file);
        })
    })

    const photoUpload = () =>
    {
        fileInputRef.value?.click();
    }

    const verifySubmit = () =>
    {
        for(let key in userMessage.value)
        {
            if(!userMessage.value[key as keyof UserMessage])
            {
                window.message.error("请填写完整信息");
                
                return;
            }
        }
    }

</script>
<style lang="less" scoped>
    @import url("@/styles/global.less");
</style>