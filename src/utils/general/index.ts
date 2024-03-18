export * from "./loginModel";

const defaultHeadImg = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
export function timeFormatter(timeStamp : number, isUnix : boolean = true, format : string = "yyyy-MM-dd HH:mm:ss")
{
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
    return imageName ?  `${import.meta.env.VITE_GLOB_REMOTE_URL}/file/get_image/${imageName}` : defaultHeadImg;
}