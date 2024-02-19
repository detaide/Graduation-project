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
                <div class="w-10 h-10 rounded-full bg-gray-400  "></div>
                <div class="text-gray-600 text-base">username</div>
            </div>
            <div class="w-20 h-10 text-center flex items-center justify-center bg-red-500 rounded-full cursor-pointer transform active:scale-95 duration-100">
                <div class="text-white font-bold">关注</div>
            </div>
        </div>

        <div class="pt-20 h-6/7 scroll-hide overflow-auto pl-4">
            <div class="border-b-2 border-gray-300">
                <div class="font-bold text-lg text-gray-800">我是标题</div>
                <span class="text-base text-gray-500 tracking-tight align-baseline whitespace-pre-line text-indent">
                    {{ text }}
                </span>
                <div class="px-4 py-6 text-gray-400 text-sm"> 发布于 2024-01-05 13:16:37</div>
            </div>
            <div>
                <Space-Content/>
            </div>
        </div>

        <div class="h-1/10 w-full 
            absolute bottom-0 left-0
            px-2
            flex flex-row items-center justify-between
        ">
            <div class="bg-gray-200 w-32 h-10 rounded-full flex flex-row items-center px-2 cursor-pointer">
                <div class="w-6 h-6 rounded-full bg-gray-400"></div>
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
    </div>
</template>
<script setup lang="ts">
    import { Icon } from '@vicons/utils';
    import { HeartOutline, StarOutline, ChatboxEllipsesOutline } from '@vicons/ionicons5';
    import SpaceContent from "./spaceContent.vue"

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
</script>
    
<style lang="less" scoped>
    .h-6\/7{
        height: 85.71%;
    }

    .scale:active{
        scale: 1.1;
    }
    
</style>