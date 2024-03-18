import { useUserInfoStore } from "@/store/modules/userInfo";
import { get, post } from "@/utils/request";


export async function getChannelTypeAPI() {
    return await get({
        url : "/channel/bring_channel_item_comment"
    });
}

export async function createChannelAPI(channelInfo : Partial<ChannelInfo>) {
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return await post({
        url : "/channel/create_channel?" + userQuery,
        data : channelInfo
    });
}

export async function bringChannelFollowAPI() {
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return await get({
        url : "/channel/channel_follow_by_user_id?" + userQuery
    });
}



export interface ChannelInfo
{
    name : string,
    type : string,
    memo : string,
    imgFile : string,
    imgURL : string,
}