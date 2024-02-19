<template>
    <div class="relative w-full h-full mask" @click="closeModelHandle($event.target as Element)">
        <div 
            class="absolute h-3/5 w-3/5 bg-white left-1/5 top-1/5 rounded-3xl
                flex flex-row p-4
                "
            ref="loginModelRef"
        >
            <div class="w-2/5 h-full text-4xl font-bold flex items-center justify-center border-r border-gray-300">LOGIN</div>
            <div class="w-3/5 h-full p-4 relative">
                <div class="font-bold text-lg">登录/注册</div>
                <div class="absolute w-3/4 top-1/4 h-1/2 left-1/8 flex flex-col gap-y-4 items-center">
                    <input type="text" class="login-input " placeholder="请输入账号">
                    <input type="text" class="login-input " placeholder="请输入密码">
                    <div class="px-4 py-2 border w-4/5 text-center rounded-lg bg-blue-500 text-white">登录 / 注册</div>
                    <div class="flex flex-row items-center text-center">
                        <n-checkbox class="text-gray-300" :size="'small'" v-model:checked="loginObj.checkItem">
                            <div class="text-xs h-6 flex items-center">
                                <div>我已阅读并同意 <span class="text-blue-500">{{ "《用户协议》" }}</span>
                                <span class="text-blue-500">《隐私政策》</span></div>
                            </div>
                        </n-checkbox>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, reactive } from "vue";
    import { NCheckbox } from "naive-ui";
    import * as LoginModel from "@/utils/general/loginModel.ts"

    interface LoginObj{
        username : string,
        password : string,
        checkItem : boolean
    }

    // const loginRef = ref(null);
    const loginObj = reactive<LoginObj>({
        username : '',
        password : '',
        checkItem : true
    });
    const loginModelRef = ref(null);

    const closeModelHandle = (dom : Element) => {
        if(!dom.contains(loginModelRef.value))
            return;
        LoginModel.closeLoginModel();
    }

</script>
    
<style lang="less">
    @import url("@/styles/global.less");
</style>