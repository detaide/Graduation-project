import { TUIChatEngine, TUIChatKit } from "@/TUIKit";
import ConversationHeaderServer from "@/TUIKit/components/TUIConversation/conversation-header/server";
import TUIConversationServer from "@/TUIKit/components/TUIConversation/server";
import { ref } from "vue";
import * as general from "@/utils/general";
import { UserMessage } from "@/typings";

export const chatModelShow = ref(false);

export async function createConversation(userId : string)
{

    if(!userId){
        window.message.error("选取用户无效");
        return;
    }

    let loginStatus = chatModalShowHandle(async () =>
    {
        let chat = TUIChatKit.chat;
        let {data} = await chat.getUserProfile({
            userIDList : [userId]
        })

        if(data && data.length)
        {
            return true;
        }
        window.message.error("该用户未开通聊天功能");
        return false;
    });

    if(!loginStatus)
    {
        general.openLoginModel();
        return;
    }

    let server = TUIConversationServer.getInstance();
    console.log(userId)
    try{
        let ret = server.generateConversation('C2C' + userId);
        console.log(ret)
    }catch(err)
    {
        console.log(err)
    }
    
}

export async function chatModalShowHandle(callback? : (...arg : any) => any)
{

    if(!checkChatLoginStatus())
    {
        window.message.error("请先登录");
        general.openLoginModel();
        return false;
    }

    if(callback)
    {
        let beforeCallStatus = await callback();
        console.log(beforeCallStatus);
        if(!beforeCallStatus) return false;
    }

    
    chatModelShow.value = true;
    return true;
}

export async function syncUserInfo(userInfo : Partial<UserMessage>)
{
    // console.log(userInfo);
    let chat = TUIChatKit.chat;
    if(!chat || !chat.getLoginUser())
    {
        window.message.warning("聊天个人信息更新连接失败");
        return;
    }

    let {data} = await chat.updateMyProfile({
        nick : userInfo.nickname,
        gender : userInfo.gender == 1 ? TUIChatEngine.TYPES.GENDER_MALE : TUIChatEngine.TYPES.GENDER_FEMALE,
        selfSignature : userInfo.description,
        allowType : TUIChatEngine.TYPES.ALLOW_TYPE_ALLOW_ANY
    })
    if(data)    return true;
    return false;
}

export function chatModelWithoutAuth()
{
    chatModelShow.value = true;
}

export function chatModalShowCloseHandle()
{
    chatModelShow.value = false;
}

export function checkChatLoginStatus()
{
    let chat = TUIChatKit.chat;
    if(!chat || !chat.getLoginUser())
    {
        return false;
    }

    return true;
}

export async function chatLogout()
{
    let chat = TUIChatKit.chat;
    await chat && chat.logout();
}