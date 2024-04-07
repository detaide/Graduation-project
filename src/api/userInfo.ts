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
    let userQuery = await userInfo.userQuery();
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
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/user/user_follow?" + userQuery,
        data : {
            followedId
        }
    })
}

export async function followUserCancelAPI(followedId : number) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
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
    console.log('user',userId, userInfo.userDetail?.userId)
    return await get({
        url : '/user/follow_status?follower_id=' + userInfo.userDetail?.userId  + '&followed_id=' + userId
    })
}

export async function checkCookieStatusAPI(userId : number)
{
    return await get({
        url : "/user/check_user_cookie?user_id=" + userId
    })
}

export async function searchUserAPI(keywords : string) {
    return await get({
        url : "/user/search_user?keywords=" + keywords
    })
}

export async function getFollowerUserAPI(userId : number) {
    return await get({
        url : "/user/follower_user?user_id=" + userId
    })
}

export async function getFollowedUserAPI(userId : number) {
    return await get({
        url : "/user/followed_user?user_id=" + userId
    });
}