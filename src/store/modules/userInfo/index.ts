import { defineStore } from "pinia";
import { getCookie, getLocalStorage, setCookie, setLocalStorage, UserInfoType } from "./userInfo";
import api from "@/api";
import { checkCookieStatusAPI, loginAPI, registerAPI, userMessageSubmitAPI } from "@/api/userInfo";
import { eventBus } from "@/utils/eventBus";
import { createDiscreteApi } from "naive-ui";
import { openLoginModel } from "@/utils/general/loginModel";
import { UserMessage } from "@/typings";
import * as general from "@/utils/general";
import { router } from "@/router";
import { TUIKitLogin } from "@/TUIKit";
import * as ChatManager from "@/utils/chat";

const {message} = createDiscreteApi(["message"]);

export const useUserInfoStore = defineStore("userInfo-store", {
    state : () : Partial<UserInfoType> => getLocalStorage(),
    getters : {
    },
    actions : {
        async login<T extends Partial<UserInfoType>>(loginInfo : T)
        {
            return await loginAPI<T>(loginInfo)
        },

        async register<T extends Partial<UserInfoType>>(registerInfo : T)
        {
            return await registerAPI<T>(registerInfo);
        },
        writeCookie(cookie? : string)
        {
            if(!cookie)
                throw new Error("empty Cookie, write fail");

            return setCookie(cookie);
        },
        async setUserInfo(userInfo : Partial<UserInfoType>)
        {
            this.id = userInfo.id;
            this.username = userInfo.username;
            if(userInfo.userDetail)
            {
                userInfo.userDetail!.avatarURL = general.headImg(userInfo?.userDetail?.avatarURL || '');
                this.userDetail = userInfo.userDetail;
            }
            await TUIKitLogin(userInfo.id!?.toString());
            console.log("setUserInfoSuccess")
            setLocalStorage(this.$state);
        },
        async isLogin()
        {
            let loginStatus = false;
            try{
                loginStatus = await this.checkCookie() as unknown as boolean;
            }catch(err)
            {
                loginStatus = false;
            }
            return !!loginStatus;
        },
        async isLoginAndOpenModal()
        {
            let loginStatus = await this.checkCookie();
            window.message.error("请先登录");
            !loginStatus && general.openLoginModel();
            return !!loginStatus;
        },
        async clearLogin()
        {
            this.id = void 0;
            this.userDetail = {};
            this.username = void 0;

        },
        async logout()
        {
            eventBus.emit("logout");
            await this.clearLogin();
            setLocalStorage(this.$state);
            await ChatManager.chatLogout();
            message.success("logout success"); 
            return setCookie("", -1);
        },
        reLogin()
        {
            eventBus.emit("logout");
            
            return setCookie("", -1);
            
        },
        async userQuery()
        {
            let loginStatus = await this.isLogin()
            if(!loginStatus || !this.id)
            {
                // await this.logout();
                return false;
            }

            return `user_id=${this.id}`;
        },
        userInfoInit()
        {

        },
        getUserDetail()
        {
            return JSON.parse(JSON.stringify(this.userDetail));
        },
        async userMessageSubmitAPI(userMessage : Partial<UserMessage>)
        {
            let {userDetail, message} = await userMessageSubmitAPI(userMessage);
            window.message.success("资料修改成功");
            userDetail.avatarURL = general.headImg(userDetail.avatarURL);
            this.userDetail = userDetail;
            setLocalStorage(this.$state);
            eventBus.emit("userDetailChange");
        },
        async jump2UserHome(userId? : number, isSelf? : boolean)
        {
            if(isSelf)
                userId = this.id;
            router.push({path : "/user" + (userId ? "/" + userId : "")})
        },
        async checkCookie()
        {
            const cookie = getCookie();
            if(!cookie || !this.id!)
                return false;
            
            let cookieStatus = await checkCookieStatusAPI(this.id!);
            
            return cookieStatus;


        }
    }
})