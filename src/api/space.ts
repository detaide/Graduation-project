import { useUserInfoStore } from "@/store/modules/userInfo";
import { post } from "@/utils/request";



export async function publishSpaceAPI(spaceInfo : SpaceInfo)
{
    const userInfo = useUserInfoStore();
    let userQuery = userInfo.userQuery();
    return await post({
        url : "/space/publish?" + userQuery,
        data : spaceInfo
    })
}

export interface SpaceInfo
{
    title : string,
    info : string,
    type : number
}