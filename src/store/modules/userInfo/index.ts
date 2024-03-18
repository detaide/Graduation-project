import { defineStore } from "pinia";
import { getCookie, getLocalStorage, setCookie, setLocalStorage, UserInfoType } from "./userInfo";
import api from "@/api";
import { loginAPI, registerAPI, userMessageSubmitAPI } from "@/api/userInfo";
import { eventBus } from "@/utils/eventBus";
import { createDiscreteApi } from "naive-ui";
import { openLoginModel } from "@/utils/general/loginModel";
import { UserMessage } from "@/typings";
import * as general from "@/utils/general";

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
        setUserInfo(userInfo : Partial<UserInfoType>)
        {
            this.id = userInfo.id;
            this.username = userInfo.username;
            if(userInfo.userDetail)
            {
                userInfo.userDetail!.avatarURL = general.headImg(userInfo?.userDetail?.avatarURL || '');
                this.userDetail = userInfo.userDetail;
            }
            setLocalStorage(this.$state);
        },
        isLogin()
        {
            return !!getCookie();
        },
        logout()
        {
            eventBus.emit("logout");
            message.success("logout success");
            return setCookie("", -1);
        },
        reLogin()
        {
            eventBus.emit("logout");
            return setCookie("", -1);
            
        },
        userQuery()
        {
            if(!this.isLogin() || !this.id)
            {
                this.logout();
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
        async userMessageSubmitAPI(userMessage : UserMessage)
        {
            let {userDetail, message} = await userMessageSubmitAPI(userMessage);
            window.message.success("资料修改成功");
            userDetail.avatarURL = general.headImg(userDetail.avatarURL);
            this.userDetail = userDetail;
            setLocalStorage(this.$state);
            eventBus.emit("userDetailChange");
        }
    }
})