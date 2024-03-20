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

export async function userMessageSubmitAPI(userMessage : Partial<UserMessage>)
{
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return post({
        url : "/user/user_message_submit?" + userQuery,
        data : userMessage
    })
}

export async function getUserDetail(userId : number) {
    return await get({
        url : "/user/user_detail?user_id=" + userId
    })
}

export async function followUserAPI(followedId : number) {
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return await post({
        url : "/user/user_follow?" + userQuery,
        data : {
            followedId
        }
    })
}

export async function followUserCancelAPI(followedId : number) {
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return await post({
        url : "/user/user_follow_cancel?" + userQuery,
        data : {
            followedId
        }
    })
}

export async function getUserFollowStatusAPI(userId : number) {
    const userInfo = useUserInfoStore();
    if(userId === userInfo.id)
    {
        return true;
    }

    return await get({
        url : '/user/follow_status?follower_id=' + userId + '&followed_id=' + userInfo.id 
    })
}