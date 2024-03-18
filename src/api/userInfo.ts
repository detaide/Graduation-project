import { useUserInfoStore } from "@/store/modules/userInfo";
import { LoginObj, UserMessage } from "@/typings";
import { get, post } from "@/utils/request";


export async function registerAPI<T extends Partial<LoginObj>>(loginInfo : T) {
    
    return post({
        url : "/user/register",
        data : loginInfo
    })
}

export async function loginAPI<T extends Partial<LoginObj>>( loginInfo : T) {
    return post({
        url : "/user/check_login",
        data : loginInfo
    })
}

export async function userMessageSubmitAPI(userMessage : UserMessage)
{
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return post({
        url : "/user/user_message_submit?" + userQuery,
        data : userMessage
    })
}

export async function getUserDetail(userId : number) {
    return get({
        url : "/user/user_detail?userId=" + userId
    })
}