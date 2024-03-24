<template>
    <div class="relative w-full h-full mask" @click="closeModelHandle($event.target)">
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
                    <div class="w-full  flex flex-col gap-y-4 items-center" v-show="loginType === 'username'">
                        <input type="text" class="login-input " placeholder="请输入账号" v-model="loginObj.username">
                        <input type="password" class="login-input " placeholder="请输入密码" maxlength="20" v-model="loginObj.password">
                        <div class="text-blue-400 underline cursor-pointer" @click="changeLoginType('email')">邮箱登录</div>
                    </div>

                    <div class="w-full  flex flex-col gap-y-4 items-center" v-show="loginType === 'email'">
                        <input type="text" class="login-input " placeholder="请输入邮箱" v-model="loginObj.username" ref="emailInputRef">
                        <div class="text-blue-400 underline cursor-pointer" @click="changeLoginType('username')">账号密码登录</div>
                    </div>

                    <div class="flex flex-col w-full items-center  justify-center gap-y-2">
                        <div 
                            class="px-4 py-2 border w-4/5 text-center rounded-lg bg-blue-500 text-white cursor-pointer active:scale-95 transform"
                            @click="varifyHandle('login')"
                        >登录</div>
                        <div 
                            class="px-4 py-2 border w-4/5 text-center rounded-lg bg-blue-500 text-white cursor-pointer active:scale-95 transform"
                            @click="varifyHandle('register')"
                        >注册</div>
                    </div>
                    
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
            <Vcode :show="VerifyShow" @success="VerifySuccess" @close="VerifyClose"/>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, reactive, onMounted } from "vue";
    import { NCheckbox } from "naive-ui";
    import * as LoginModel from "@/utils/general/loginModel";
    import Vcode from "vue3-puzzle-vcode";
    import { useUserInfoStore } from "@/store/modules/userInfo";
    import { createDiscreteApi} from "naive-ui";
    import * as Crypto from "@/utils/crypto";
    import { eventBus } from "@/utils/eventBus";
import { UserInfoType } from "@/store/modules/userInfo/userInfo";

    interface LoginObj{
        username : string,
        password : string,
        checkItem : boolean,
        email : string
    }

    interface loginRetType extends UserInfoType
    {
        cookie? : string,
    }

    type LoginType = "username" | "email";

    // const loginRef = ref(null);
    const loginObj = reactive<LoginObj>({
        username : '',
        password : '',
        checkItem : true,
        email : ''
    });
    const loginModelRef = ref(null);
    const emailInputRef = ref<HTMLInputElement>();


    const VerifyShow = ref(false);
    const loginType = ref<LoginType>("username");        // 1 : 账密， 2： 邮箱
    const userInfoStore = useUserInfoStore();
    const {message} = createDiscreteApi(["message"]);
    const verifyType = ref<"login" | "register">("login");

    const closeModelHandle = (dom : EventTarget | null) => {
        if(!dom)    return;
        if(!(dom as unknown as Element).contains(loginModelRef.value))
            return;
        LoginModel.closeLoginModel();
    }

    const verifyFunc = () =>
    {
        if(!loginObj.checkItem)
        {
            message.warning("请先同意条款服务");
            return;
        }

        let emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
        if(loginType.value === 'email')
        {
            if(!emailRegex.test(loginObj.email))
            {
                message.warning("邮箱格式错误", {duration : 3000});
                emailInputRef.value?.classList.add("input-error");
                return false;
            }
        }

        if(loginType.value === "username")
        {
            if(!loginObj.username || !loginObj.password)
            {
                message.warning("账号密码或为空", {duration : 3000});
                return false;
            }
        }

        return true;
    }

    const varifyHandle = (type : "register" | "login") =>
    {

        if(!verifyFunc())
        {
            return;
        }

        VerifyShow.value = true;
        verifyType.value = type;
    }

    const loginBtn = async () =>
    {
        let loginRet : Partial<loginRetType> = {};
        let encryptedPassword = Crypto.encrypted(loginObj.password);

        loginRet = await userInfoStore.login({...loginObj, password : encryptedPassword});
        console.log(loginRet);
        userInfoStore.writeCookie(loginRet?.cookie);
        await userInfoStore.setUserInfo(loginRet);
        
        eventBus.emit("Login", true);
        message.success("登录成功");
        LoginModel.closeLoginModel();
    }
    const registerBtn = async () =>
    {
        let registerRet = null;

        let encryptedPassword = Crypto.encrypted(loginObj.password);

        registerRet = await userInfoStore.register({...loginObj, password : encryptedPassword});

        message.success(registerRet);
    }

    const VerifySuccess = () =>
    {
        VerifyShow.value = false;
        verifyType.value === "login" ? loginBtn() : registerBtn();
    }

    const VerifyClose = () =>
    {
        VerifyShow.value = false;
    }

    const changeLoginType = (type : LoginType) =>
    {
        loginType.value = type;
        (type === "username") && emailInputRef.value?.classList.remove("input-error");
    }

    onMounted(() =>
    {
    })


</script>
    
<style lang="less">
    @import url("@/styles/global.less");
    .n-model-mask{
        z-index: -1000 !important;
    }

</style>