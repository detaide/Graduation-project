<template>
    <div class="w-full h-full relative">
        <div class="h-1/10 w-full 
            absolute top-0 left-0
            flex flex-row items-center justify-between px-4
            border-b-2 border-gray-300
            bg-white
            "
        >
            <div class="flex flex-row items-center gap-x-2 cursor-pointer">
                <img :src="userInfo.avatarURL" class="w-10 h-10 rounded-full bg-gray-400" @click="userInfoStore.jump2UserHome(userInfo.userId)"/>
                <div class="text-gray-600 text-base">{{ userInfo.nickname }}</div>
            </div>
            <div class="w-20 h-10 text-center flex items-center justify-center bg-red-500 rounded-full cursor-pointer transform active:scale-95 duration-100">
                <div class="text-white font-bold" v-show="!isFollow" @click="followHandle">关注</div>
                <div class="text-white font-bold" v-show="isFollow" @click="unFollowHandle">已关注</div>
            </div>
        </div>

        <div class="pt-20 h-6/7 scroll-hide overflow-auto pl-4">
            <div class="border-b-2 border-gray-300">
                <div class="font-bold text-lg text-gray-800 py-4">{{ props.spaceInfo.title }}</div>
                <span class="text-base text-gray-500 tracking-tight align-baseline whitespace-pre-line text-indent refHTML" ref="mdHTMLRef">
                    <!-- {{ textHTML }} -->
                    <div v-html="textHTML"></div>
                </span>
                <div class="px-4 py-6 text-gray-400 text-sm">
                    <div>类型： {{ props.spaceInfo.typeName }}</div>
                    <div>发布于 {{ general.timeFormatter(props.spaceInfo.publishTime || new Date().getTime()) }}</div>
                    
                </div>
            </div>
            <div>
                <Space-Comment :spaceId="props.spaceInfo.id" ref="spaceComment"/>
            </div>
        </div>

        <div class="h-1/10 w-full 
            absolute bottom-0 left-0
            px-2
            flex flex-row items-center justify-between border-t-2 border-gray-300"
            v-if="!commentModelShow"
        >
            <div class="bg-gray-200 w-32 h-10 rounded-full flex flex-row items-center px-2 cursor-pointer" @click="commentModelHandle" >
                    <img class="w-6 h-6 rounded-full bg-gray-400" :src="userInfoStore.getUserDetail().avatarURL"/>
                    <div class="text-gray-400 text-xs pl-2">说些什么...</div>
                
            </div>
            
            <div class="flex flex-row justify-between items-center w-1/2 gap-2 pr-2">
                <div class="flex items-center gap-1 cursor-pointer">
                    <Icon :size="20">
                        <HeartOutline/>
                    </Icon>
                    <div>100+</div>
                </div>
                <div class="flex items-center gap-1 cursor-pointer">
                    <Icon :size="20">
                        <StarOutline/>
                    </Icon>
                    <div>200+</div>
                </div>
                <div class="flex items-center gap-1 cursor-pointer">
                    <Icon :size="20">
                        <ChatboxEllipsesOutline/>
                    </Icon>
                    <div>300</div>
                </div>
            </div>
        </div>
        <div v-if="commentModelShow" class="h-1/5 w-full 
            absolute bottom-0 left-0
            px-2
            flex flex-col  justify-between gap-y-2
            bg-white overflow-hidden py-2"
        >
            <textarea
                class="w-full h-2/3 rounded-lg border-gray-500 p-3 text-sm outline outline-black "
                placeholder="Message"
                rows="8"
                id="message"
                v-model="comment"
            ></textarea>
            <div class="flex flex-row gap-2">
                <button
                    class="inline-block w-full rounded-lg bg-black px-4 py-2 font-medium text-white sm:w-auto
                    transform active:scale-95 duration-100
                    "
                    @click="publishSpaceComment"
                >
                    回复
                </button>
                <button
                    class="inline-block w-full rounded-lg px-4 py-2 font-medium  sm:w-auto border border-gray-400
                    transform active:scale-95 duration-100
                    "
                    @click="commentModelShow = false"
                >
                    取消
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { Icon } from '@vicons/utils';
    import { HeartOutline, StarOutline, ChatboxEllipsesOutline } from '@vicons/ionicons5';
    import SpaceComment from "./spaceComment.vue";
    import Vditor from "vditor";
    import {computed, onMounted, ref} from "vue";
    import { CommentInfoType, SpaceInfo, UserMessage } from '@/typings';
    import * as general from "@/utils/general";
    import { followUserAPI, followUserCancelAPI, getUserDetail, getUserFollowStatusAPI } from '@/api/userInfo';
    import { bringSpaceCommentBySpaceId, publishSpaceCommentAPI } from '@/api/space';
    import { useUserInfoStore } from '@/store/modules/userInfo';
import { followChannel } from '@/api/channel';

    interface Props
    {
        spaceInfo : Partial<SpaceInfo>
    }

    const headImg = (imageName? : string) =>
    {
        return imageName ?  `${import.meta.env.VITE_GLOB_REMOTE_URL}/file/get_image/${imageName}` : defaultHeadImg;
    }

    const textHTML = ref('');
    const isFollow = ref(false);
    const props = defineProps<Props>();
    const userInfo = ref<Partial<UserMessage>>({});
    const defaultHeadImg = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
    const commentModelShow = ref(false);
    const comment = ref('');
    const userInfoStore = useUserInfoStore();
    const spaceComment = ref<{addCommenthandle : (arg : Partial<CommentInfoType>) => any}>();
    
    

    const text = `
    The sky was a brilliant shade of blue, with fluffy white clouds scattered across the horizon. A gentle breeze blew through the trees, rustling the leaves and carrying the scent of blooming flowers. Birds chirped and sang in the distance, creating a peaceful and serene atmosphere.
As I walked along the path, I couldn't help but feel a sense of calm wash over me. The beauty of nature never failed to amaze me, and I was grateful for the opportunity to enjoy it.
I continued on my way, taking in the sights and sounds around me. A squirrel darted across the path, its bushy tail trailing behind it. A butterfly fluttered by, its delicate wings catching the sunlight and casting a rainbow of colors on the ground.
As I rounded a bend in the path, I came across a small pond. The water was still and clear, reflecting the trees and sky like a mirror. Lily pads floated on the surface, and small fish darted through the water.
I sat down on a nearby rock and watched the pond for a while, lost in thought. It was moments like these that made me appreciate the simple things in life, and reminded me to slow down and enjoy the present moment.
Eventually, I stood up and continued on my way. The path wound through the woods, leading me deeper into the heart of nature. I could hear the sound of a waterfall in the distance, and I quickened my pace in anticipation.
As I emerged from the trees, I was greeted by a breathtaking sight. The waterfall cascaded down from a towering cliff, its misty spray casting rainbows in the sunlight. A pool of crystal-clear water lay at its base, inviting me to take a dip.
Without hesitation, I stripped down to my swimsuit and dove into the water. The coolness was refreshing, and I felt invigorated as I swam around the pool. I climbed out and sat on a nearby rock, basking in the warmth of the sun.
It was moments like these that made life worth living, and I was grateful for the opportunity to experience them. As I made my way back home, I felt renewed and refreshed, ready to face whatever challenges lay ahead.
    `
    
    const defaultText = `内容为空....`;


    const md2html = async (text : string) =>
    {
        return await Vditor.md2html(text, {cdn : "/cdn", mode : "light"});
    }

    onMounted(async () =>
    {
        let followStatus = await getUserFollowStatusAPI(props.spaceInfo?.userId!);
        isFollow.value = followStatus as unknown as boolean;
        textHTML.value = await md2html(props?.spaceInfo?.info || defaultText);
        let userDetailRet = await getUserDetail(props.spaceInfo?.userId! || 0) as Partial<UserMessage>;
        userDetailRet.avatarURL = headImg(userDetailRet?.avatarURL);
        userInfo.value = userDetailRet;
    })

    const commentModelHandle = () =>
    {
        commentModelShow.value = true;
    }

    const publishSpaceComment = async () =>
    {
        let commentInfo = await publishSpaceCommentAPI(comment.value, props.spaceInfo.id!);
        commentModelShow.value = false;
        spaceComment.value?.addCommenthandle(commentInfo);
        window.message.success("回复成功");
    }

    const followHandle = async () =>
    {
        let ret = await followUserAPI(userInfo.value.userId!);
        window.message.success(ret);
        isFollow.value = true;
    }

    const unFollowHandle = async () =>
    {
        let ret = await followUserCancelAPI(userInfo.value.userId!)
        window.message.success(ret);
        isFollow.value = false;
    }


</script>
    
<style lang="less" scoped>
    .h-6\/7{
        height: 85.71%;
    }

    .scale:active{
        scale: 1.1;
    }
    

</style>