import { useUserInfoStore } from "@/store/modules/userInfo";
import { get, post } from "@/utils/request";


export async function getChannelTypeAPI() {
    return await get({
        url : "/channel/bring_channel_item_comment"
    });
}

export async function createChannelAPI(channelInfo : Partial<ChannelInfo>) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/channel/create_channel?" + userQuery,
        data : channelInfo
    });
}

export async function bringChannelFollowAPI() {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();

    if(!userQuery)
    {
        return [];
    }
    return await get({
        url : "/channel/channel_follow_by_user_id?" + userQuery
    });
}

export async function bringChannelDetailByNameAPI(channelName: string) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();

    return await get({
        url : "/channel/bring_channel_detail_by_name?channel_name=" + channelName + (userQuery ? "&" + userQuery : "")
    });
    
}

export async function createChannelItemAPI(channelItem : Partial<ChannelItemInfo>) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return post({
        url : "/channel/create_channel_item?" + userQuery,
        data : channelItem
    })
}


export async function bringChannelItemListAPI(channelId : number, keywords? : string) {
    return await get(
        {
            url : "/channel/bring_channel_item_info?channel_id=" + channelId + (keywords ? "&keywords=" + keywords : "")
        }
    )
}

export async function bringChannelItemDetailAPI(channelItemId : number) {
    return await get({
        url : "/channel/bring_channel_item_detail?channel_item_id=" + channelItemId
    })
}

export async function createChannelCommentAPI(comment : string, channelItemId : number) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/channel/create_channel_item_comment?" + userQuery,
        data : {
            comment,
            channelItemId
        }
    })
}

export async function addChannelScanNumberAPI(channelId : number) {
    return await get({
        url : "/channel/add_channel_scan_number?channel_id=" + channelId,
    })
}

export async function bringChannelItemByUserIdAPI() {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await get({
        url : "/channel/bring_channel_item_by_user_id?" + userQuery
    })
}

export async function bringAllChannelItemAPI() {
    return await get({
        url : "/channel/bring_all_channel_item"
    })
}

export async function bringAllChannelAPI() {
    return await get({
        url : "/channel/bring_all_channel"
    })
}


export async function followChannel(channelId : number, type? : number) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/channel/follow_channel?" + userQuery,
        data : {
            channelId,
            type
        }
    })
}

export async function searchChannelAPI(keywords : string) {
    return await get({
        url : "/channel/search_channel?keyword=" + keywords
    })
}

export async function bringChannelHotAPI() {
    return await get({
        url : "/channel/channel_hot"
    })
}

export async function deleteChannelItemAPI(channelItemId : number) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/channel/delete_channel_item?" + userQuery,
        data : {
            channelItemId
        }
    })
}

export async function deleteChannelCommentAPI(channelCommentId : number) {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/channel/delete_channel_item_comment?" + userQuery,
        data : {
            channelCommentId
        }
    })
}

export interface ChannelInfo
{
    name : string,
    type : string,
    memo : string,
    imgFile : string,
    imgURL : string,
}

export interface ChannelItemInfo
{
    title : string,
    comment : string,
    imgFileURL : string[]
}