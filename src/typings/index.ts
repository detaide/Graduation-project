
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
    userId : number,
    avatar? : string,
    academy?  :string,
    studentId? : string,
    cerType? : boolean          // 认证状态
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
    typeName? : string,
    nickname : string,
    avatarURL : string,
    spaceComment : number,
    spaceStar : number,
    spaceLike : number,
    cerType? : number
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
    subCommentItemData? : Array<ChannelCommentSubItem>
}

export interface MessageType
{
    ownerId : number,
    commentUserId : number,
    publishTime : number,
    nickname : string,
    avatarURL : string,
    read : number,
    comment : string
}

export interface SpaceMessageType extends MessageType
{
    title : string,
    info : string,
    spaceId : number,
}

export interface ChannelMessageType extends MessageType
{
    title : string,
    channelItemId : number,

}



/**
 * 变量区
 * <option value="new_west">紫霄校区西区</option>
                                        <option value="new_center">紫霄校区中区</option>
                                        <option value="old">学园校区</option>
                                        <option value="old-north">北区</option>
 */

export class SchoolLocation {
    static schoolLocation : {[key : string] : string} = {
        new_west : "紫霄校区西区",
        new_center : "紫霄校区中区",
        old : "学园校区",
        old_north : "北区"
    }
    
    static getSchoolLocation(location : string) : string
    {
        return this.schoolLocation[location] || '未知';
    }

    static getSchoolLocationKey(location : string) : string
    {
        for(let key in this.schoolLocation)
        {
            if(this.schoolLocation[key] === location)
            {
                return key;
            }
        }
        return "";
    }
}

export class AcademyMap{
    static academyLocation : {[key : string] : string} = {
        601 : "文化与传播学院",
        602 : "外国语学院",
        603 : "数学与金融学院",
        604 : "环境与生化学院",
        605: "机电与信息工程学院",
        606 : "土木工程学院",
        607 : "工艺美术学院",
        608 : "音乐学院",
        609 : "体育学院",
        610 : "护理学院",
        611 : "药学与产业学院",
        612 : "管理学院",
        613 : "商学院",
        614 : "基础教育学院",
        615 : "基础医学院",
        616 : "马克思主义学院",
        617 : "继续教育学院",
        618 : "新工科产业学院"
    }

    static getAcademyLocation(location : string) : string
    {
        // console.log(location, this.academyLocation[location])
        return this.academyLocation[location] || '未知';
    }

    static getAcademyLocationKey(location : string) : string
    {
        for(let key in this.academyLocation)
        {
            if(this.academyLocation[key] === location)
            {
                return key;
            }
        }
        return "";
    }
}