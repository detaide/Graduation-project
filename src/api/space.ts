import { useUserInfoStore } from "@/store/modules/userInfo";
import { get, post } from "@/utils/request";



export async function publishSpaceAPI(spaceInfo : SpaceInfo)
{
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return await post({
        url : "/space/publish?" + userQuery,
        data : spaceInfo
    })
}

export async function getAllSpaceInfoAPI<T>() : Promise<T>
{
    return await get({
        url : "/space/all_space"
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
    let userQuery = userInfo.userQuery();
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
    let userQuery = userInfo.userQuery();
    return await post({
        url : "/space/add_thumbs?space_id=" + userQuery,
        data : {
            spaceId
        }
    })
}
export interface SpaceInfo
{
    title : string,
    info : string,
    type : number
}