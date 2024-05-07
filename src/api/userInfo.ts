import { useUserInfoStore } from "@/store/modules/userInfo";
import { LoginObj, UserMessage } from "@/typings";
import { get, post } from "@/utils/request";


export async function requestEmailCodeApi(email : string)
{
    return get({
        url : "/user/mail_code?email=" + email
    })
}

export async function emailLoginApi(email : string, code : number)
{

    return get({
        url : "/user/mail_login?email=" + email + "&code=" + code
    })
}

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

    if(!userId || !userInfo.id)
    {
        return false;
    }

    if(userId === userInfo.id)
    {
        return true;
    }
    
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

export async function checkPwdRightAPI(password : string)
{
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/user/check_password_right?" + userQuery,
        data : {
            password
        }
    })
}

export async function changeUserPwdAPI(password : string, oldPassword : string)
{
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();

    return await post({
        url : "/user/change_user_pwd?" + userQuery,
        data : {
            old_password : oldPassword,
            new_password : password
        }
    })
}