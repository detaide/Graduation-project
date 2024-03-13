import { post, get } from "@/utils/request";

export async function uploadImg<T>(files : File[]) : Promise<T>
{
    let formData = new FormData();
    await files.forEach(async (file) =>
    {
        await formData.append('files', file);
    })

    return post<T>({
        url : "/file/upload_images",
        headers : {
            'Content-Type': 'multipart/form-data'
        },
        data : formData
    }) as T;
}

export async function getImageDemo() {
    let fileName = '/97353087-20a2-48c9-aa11-7897d3544eb4.png';
    return get({
        url : '/file/get_image/' + fileName
    })
}