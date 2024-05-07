<template >
    <div class="w-1/4 h-1/2">
        <div class="w-full h-full min-h-400 bg-white rounded-lg px-4 py-6 relative">
            <div class="text-lg py-4 font-bold">修改密码</div>

            <div class="w-3/4 m-auto">
                <p class="text-xs font-medium text-gray-500"><span>1/2</span> - 进度</p>
            
                <div class="mt-4 overflow-hidden rounded-full bg-gray-200">
                    <div class="h-2 w-1/2 rounded-full bg-blue-500" ref="processRef"></div>
                </div>
            </div>
            <section class="pl-12 pt-4" ref="firstSec">
                <div class="flex flex-row items-center gap-x-4">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">旧密码</label>
                    <div class="mt-2 w-3/5">
                        <input v-model="passwordObj.oldPwd" id="studentId" name="studentId" type="password" autocomplete="studentId"  class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div @click="nextStep" class="cursor-pointer border px-4 py-2 w-20 text-white bg-blue-500 rounded-lg absolute bottom-32 right-10" >下一步</div>
            </section>

            <section class="pl-12 pt-4 hidden" ref="secondSec">
                <div class="flex flex-row items-center gap-x-4">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">新密码</label>
                    <div class="mt-2 w-3/5">
                        <input v-model="passwordObj.newPwd" id="studentId" name="studentId" type="password" autocomplete="studentId"  class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class="flex flex-row items-center gap-x-4">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">重复新密码</label>
                    <div class="mt-2 w-3/5">
                        <input v-model="passwordObj.newPwdTwice" id="studentId" name="studentId" type="password" autocomplete="studentId"  class="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div @click="submitChange" class="cursor-pointer border px-4 py-2 w-24 text-white bg-blue-500 rounded-lg absolute bottom-28 right-10" >提交修改</div>
            </section>
        </div>
        
    </div>
</template>
<script setup lang="ts">
    import {ref, onMounted, defineEmits} from "vue";
    import * as Crypto from "@/utils/crypto";
    import {checkPwdRightAPI, changeUserPwdAPI} from "@/api/userInfo"

    interface Emit{
        (ev : "closePage") : void
    }

    const emit = defineEmits<Emit>();

    const processRef = ref();
    const firstSec = ref<HTMLDivElement>();
    const secondSec = ref<HTMLDivElement>();
    const passwordObj : {[key : string] : string} = {
        oldPwd : '',
        newPwd : '',
        newPwdTwice : '',
    }

    onMounted(() => {

    })

    const nextStep = async () =>
    {

        if(!passwordObj.oldPwd)
        {
            window.message.error("密码不能为空");
            return;
        }

        let cryptedPwd = Crypto.encrypted(passwordObj.oldPwd);
        
        await checkPwdRightAPI(cryptedPwd);


        firstSec?.value?.classList.add("hidden");
        secondSec?.value?.classList.remove("hidden");
        processRef.value.classList.add("w-full");
    }

    const verify = () =>
    {
        if(!passwordObj.newPwd || !passwordObj.newPwdTwice)
        {
            window.message.error("新密码为空");
            return false;
        }

        if(passwordObj.newPwd != passwordObj.newPwdTwice)
        {
            window.message.error("两次密码不一致");
            return false;
        }

        return true;
    }

    const submitChange = async () =>
    {
        if(!verify())
        {
            return;
        }

        await changeUserPwdAPI(Crypto.encrypted(passwordObj.newPwd), Crypto.encrypted(passwordObj.oldPwd));
        window.message.success("修改成功");
        emit("closePage");
    }

</script>
    
<style lang="less">
    .min-h-400{
        min-height: 400px;
    }
    
</style>