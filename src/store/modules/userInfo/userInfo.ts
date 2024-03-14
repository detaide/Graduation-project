import { LoginObj, UserMessage } from "@/typings";
import { ss } from "@/utils/storage";
import { userInfo } from "os";
import { Ref, ref } from "vue";

const LOCAL_NAME = "UserInfo";
const COOKIE_NAME = "token";

export interface UserInfoType extends LoginObj
{
    id : number,
    username : string,
    userDetail : Partial<UserMessage>,
}


export function defaultUserInfo() : Partial<UserInfoType>
{
    return {
        username : "123",
        id : 0,
        userDetail : {}
    };
}

export function setLocalStorage(userInfo : Partial<UserInfoType>)
{
    ss.set(LOCAL_NAME, userInfo);
}

export function getLocalStorage() : Partial<UserInfoType>
{
    return {...defaultUserInfo(), ...ss.get(LOCAL_NAME)};
}

// export function setCookie(cookie : string)
// {
//     document.cookie =   COOKIE_NAME + '=' +  cookie;
// }

export function setCookie(cookie : string, expire : number = 1000 * 60 * 60 * 4)
{
    document.cookie =   COOKIE_NAME + '=' +  cookie + "; expires=" + new Date(Date.now() + expire).toUTCString();
}

export function getCookie()
{
    return document.cookie;
}

