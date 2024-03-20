
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
    id : number,
    userId : number
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
    typeName? : string
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
    id : number,
    channelId : number,
    follow : number,
    createTime : number,
    imgURL : string,
    itemNumber : number,
    memo : string,
    name : string,
    ownerId : number,
    type : number
}

export interface ItemType
{
    id : number,
    ownerId : number,
    channelId : number,
    publishTime : number,
    title : string,
    comment : string,
    avatarURL : string,
    nickname : string,
    commentNumber ? : number
}

export interface ChannelCommentSubItem extends ChannelCommentData
{
    avatarURL : string,
    channelItemId : number,
    comment : string,
    id : number,
    nickname : string,
    publishTime : number,
    userId : number,
    commentOwnerId : number,
}

export interface ChannelCommentData
    {
        id : number,
        avatarURL : string,
        channelOwnerId : number,
        comment : string,
        imgURL : string,
        memo : string,
        name : string,
        nickname : string,
        ownerId : number,
        publishTime : number,
        title : string,
        type : number,
        typeName : string,
        userId : number,
        isMainComment : boolean,
        channelImg : string,
        commentOwnerId : number,
        subCommentItemData? : ChannelCommentSubItem
    }