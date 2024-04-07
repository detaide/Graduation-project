import { useUserInfoStore } from "@/store/modules/userInfo";
import { get, post } from "@/utils/request";



export async function publishSpaceAPI(spaceInfo : SpaceInfo)
{
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/space/publish?" + userQuery,
        data : spaceInfo
    })
}

export async function getAllSpaceInfoAPI<T>(type? : number) : Promise<T>
{
    return await get({
        url : "/space/all_space" + (type ? "?type=" + type : "")
    }) as T
}

export async function bringAppSpaceByUserIdAPI<T>(userId? : number) : Promise<T>
{
    return await get({
        url : "/space/space_info_by_user_id?user_id=" + userId
    }) as T
}

export async function bringSpaceByFollow<T>(userId : number) : Promise<T> {
    return await get({
        url : "/space/space_by_follow?user_id=" + userId
    }) as T
}

export async function bringSpaceDetailAPI<T>(id : number) : Promise<T>
{
    return await get({
        url : "/space/space_detail?space_id=" + id
    }) as T;
}

export async function publishSpaceCommentAPI(comment : string, spaceId : number)
{
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    console.log(userQuery);
    return await post({
        url : "/space/publish_comment?" + userQuery,
        data : {
            comment,
            spaceId
        }
    })

}

export async function bringSpaceCommentBySpaceId(spaceId : number)
{
    return await get({
        url : "/space/space_comment?space_id=" + spaceId
    })
}

export async function bringSpaceByUserIdAPI(userId:number) {
    return await get({
        url : "/space/space_by_user_id?user_id=" + userId
    })
}

export async function addThumbsAPI(spaceId : number)
{
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return await post({
        url : "/space/add_thumbs?space_id=" + userQuery,
        data : {
            spaceId
        }
    })
}

export async function getSpaceType() {
    return get({
        url : "/space/space_type"
    })
}

export async function searchSpaceAPI(keywords : string) {
    return get({
        url : "/space/search_space?keyword=" + keywords
    })
}

export async function getSpaceGeneral(spaceId : number, userId : number)
{
    if(!spaceId || !userId)
    {
        window.message.error("参数错误");
        return;
    }
    return get({
        url : "/space/space_general?space_id=" + spaceId + (userId ? "&user_id=" + userId : "")
    })
}

export async function spaceFollowAPI(spaceId : number, userId : Number, type : "Star" | "Like", followStatus : "Add" | "Cancel") {
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return post({
        url : "/space/space_follow?" + userQuery,
        data : {
            spaceId,
            userId,
            type,
            followStatus
        }
    })
}

export async function deleteSpaceAPI(spaceId : number)
{
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    return post({
        url : '/space/delete_space?' + userQuery,
        data : {
            spaceId : spaceId
        }
    })
}

export async function deleteSpaceCommentAPI(spaceCommentId : number)
{
    const userInfo = useUserInfoStore();
    let userQuery = await userInfo.userQuery();
    console.log(spaceCommentId)
    return post({
        url : "/space/delete_comment?" + userQuery,
        data : {
            commentId : spaceCommentId
        }
    })

}

export async function getTodaySpaceAPI()
{
    return get({
        url : "/space/today_space"
    })

}

export async function addSpaceScanNumberAPI(spaceId : number)
{
    return get({
        url : "/space/add_scan_number?space_id=" + spaceId,
    })
}

export interface SpaceInfo
{
    title : string,
    info : string,
    type : number
}