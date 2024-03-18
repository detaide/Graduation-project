
export interface LoginObj
{
    username : string,
    password : string
}

export interface UserMessage
{
    nickname : string,
    description : string,
    address : string,
    avatarFile? : File | string,
    firstName : string,
    lastName : string,
    gender : number,
    school : string,
    birthday : number,
    email : string,
    avatarURL : string,
}

export interface SpaceInfo
{
    title : string,
    info : string,
    type : number,
    id : number,
    scanNumber : number,
    userId : number,
    headImage? : string,
    outerInfo? : string,
    publishTime : number,
}

export interface SpaceDetail
{
    article : Partial<SpaceInfo>,
}

export interface CommentInfoType
{
    nickname : string,
    avatarURL : string,
    id : number,
    userId : number,
    spaceId : number,
    publishTime : number | string,
    comment : string,
    thumbs : number,
}

export interface ChannelInfo
{
    
}