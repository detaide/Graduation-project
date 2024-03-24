<template >
    <div class="w-4/5 h-4/5 bg-flow min-h-600 p-8 rounded-lg">
        <div class="font-bold text-lg pb-6">
            <div v-show="props.type === 'followed'" >粉丝</div>
            <div v-show="props.type === 'follower'">关注</div>
        </div>
        <div class="flex flex-wrap gap-x-10 gap-y-2" v-show="userList?.length">
            <div v-for="(item, index) in userList" :key="index" class="flex flex-row gap-x-4 w-2/5 cursor-pointer bg-flow-box" @click="jump2UserHome(item.userId!)">
                <img :src="general.headImg(item.avatarURL!)" alt="" class="w-20 h-20 rounded-lg"/>
                <div class="flex flex-row justify-between w-full">
                    <div class="w-3/5">
                        <div class="flex flex-row gap-x-2">
                        <div>{{ item.nickname }}</div>
                            <Icon :size="12" color="blue" v-show="item.gender === 1">
                                <MaleSharp/>
                            </Icon>
                            <Icon :size="12" color="pink" v-show="item.gender !== 1">
                                <FemaleSharp/>
                            </Icon>
                        </div>
                        <div class="px-4 text-gray-500">{{ textOverflow(item.description!) }}</div>
                    </div>
                    <div class="2/5 flex justify-end items-start text-gray-500">
                        <div>地址：{{ SchoolLocation.getSchoolLocation(item.school!) + '-' + item.address }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="!userList?.length" class="w-full text-gray-600 text-center">
            空空如也...
        </div>
    </div>
</template>
<script setup lang="ts">

    import { UserMessage } from '@/typings';
    import { onMounted, ref } from 'vue';
    import {getFollowerUserAPI, getFollowedUserAPI} from "@/api/userInfo";
    import { Icon } from "@vicons/utils";
    import { MaleSharp, FemaleSharp, ChatboxEllipsesSharp, Location } from "@vicons/ionicons5";
    import {SchoolLocation} from "@/typings";
    import * as general from "@/utils/general";
    import {useRouter} from "vue-router";

    type followType = "follower" | "followed";

    const props = defineProps<{
        type : followType,
        userId : number
    }>();
    const userList = ref<Array<Partial<UserMessage>>>([]);
    const router = useRouter();

    onMounted(async () =>
    {
        // console.log(props.type)
        switch(props.type)
        {
            case "follower":
                let followerData = await getFollowerUserAPI(props.userId);
                userList.value = followerData as unknown as Array<Partial<UserMessage>>;
                break;
            case "followed":
                let followedData = await getFollowedUserAPI(props.userId);
                userList.value = followedData as unknown as Array<Partial<UserMessage>>;
                break;
        }

    })

    const textOverflow = (text  :string) =>
    {
        if(!text)   return "";
        let length = 20;
        return text.length > length ? text.slice(0, length) + '...' : text;
    }

    const jump2UserHome = (id : number) =>
    {
        console.log("/user/" + id)
        if(id){
            router.push({path : "/user/" + id});
            window.location.reload();
        }
            
    }
</script>
<style lang="less" scoped>
    .min-h-600{
        min-height : 600px;
    }
    .bg-flow{
        background-color: #e9ecef;
    }

    .bg-flow-box{
        background-color: #e9ecef;
        padding: 12px;
        border-radius: 12px;
        transition: .2s all;
        box-shadow:
        7px 7px 12px rgba(0, 0, 0, .4),
        -7px -7px 12px rgba(255, 255, 255, .9);
    }

    .bg-flow-box:active{
        box-shadow:
        0 0 0 rgba(0, 0, 0, .4),
            0 0 0 rgba(255, 255, 255, .9),
            inset -7px -7px 12px rgba(255, 255, 255, .9),
            inset 7px 7px 12px rgba(0, 0, 0, .4);
    }
</style>