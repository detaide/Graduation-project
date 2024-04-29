export * from "./loginModel";
import { useUserInfoStore } from '@/store/modules/userInfo';
import { TUIKitLogin } from "@/TUIKit";

const defaultHeadImg = "https://oss.ptu.edu.cn/fileApi/my-bucket/12fcf65315994eaabc2b1d683a06ead3.png";
export function timeFormatter(timeStamp? : number, isUnix : boolean = true, format : string = "yyyy-MM-dd HH:mm:ss")
{
    if(!timeStamp)
        return 'Time Format Error';

    let date = new Date(timeStamp * (isUnix ? 1000 : 1));
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let result = format.replace("yyyy", year.toString());
    result = result.replace("MM", month.toString().padStart(2, "0"));
    result = result.replace("dd", day.toString().padStart(2, "0"));
    result = result.replace("HH", hour.toString().padStart(2, "0"));
    result = result.replace("mm", minute.toString().padStart(2, "0"));
    result = result.replace("ss", second.toString().padStart(2, "0"));
    return result;
}


export function headImg(imageName : string)
{
    // console.log("imgURL : ", `${import.meta.env.VITE_GLOB_REMOTE_URL}/file/get_image/${imageName}`)
    return imageName ?  `${import.meta.env.VITE_GLOB_REMOTE_URL}/file/get_image/${imageName}` : defaultHeadImg;
}

export async function init()
{
    const userInfoStore = useUserInfoStore();
    let cookieStatus = await userInfoStore.checkCookie();
    await cookieStatus && TUIKitLogin(userInfoStore.id!.toString());
}

