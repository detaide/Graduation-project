<template >
    <div class="p-4">
        <div class="text-lg font-bold pb-4">用户搜索结果</div>
        <div class="flex flex-wrap gap-x-10 gap-y-2" v-show="props.userInfo?.length">
            <div v-for="(item, index) in props.userInfo" :key="index" class="flex flex-row gap-x-4 w-2/5" @click="jump2UserHome(item.userId!)">
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
        <div v-show="!props.userInfo?.length" class="w-full text-gray-600 text-center">
            空空如也...
        </div>
    </div>
</template>

<script setup lang="ts">
    import {UserMessage} from "@/typings";
    import {onMounted} from "vue";
    import * as general from "@/utils/general";
    import { Icon } from "@vicons/utils";
    import { MaleSharp, FemaleSharp, ChatboxEllipsesSharp, Location } from "@vicons/ionicons5";
    import { SchoolLocation } from "@/typings";
import { router } from "@/router";

    const props = defineProps<{
        userInfo : Array<Partial<UserMessage>>
    }>();

    onMounted(() =>
    {
        console.log(props.userInfo)
    })

    const textOverflow = (text  :string) =>
    {
        if(!text)   return "";
        let length = 20;
        return text.length > length ? text.slice(0, length) + '...' : text;
    }

    const jump2UserHome = (id : number) =>
    {
        id && router.push({path : "/user/" + id})
    }
</script>

<style lang="less" scoped>
    
</style>