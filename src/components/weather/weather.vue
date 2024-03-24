<template>
    <div class="w-full h-full sun text-white flex items-center py-10 flex-col gap-1">
        
        <div class="font-bold text-lg">{{ weather.weather }}</div>
        
        <div class="font-bold text-4xl py-2">{{weather.temperature_float}}℃</div>
        <div>风向 : {{ weather.winddirection }}</div>
        <div>风力 : {{ weather.windpower }}</div>
        <div>湿度 : {{ weather.humidity_float }}</div>
        <div class="pt-2">福建·莆田 中国</div>
    </div>
</template>
<script setup lang="ts">
import { getWeatherAPI } from '@/utils/gaodeAPI';
import {onMounted, ref} from "vue";

    interface WeatherType{
        temperature_float: string,
        weather: string,
        winddirection: string,
        windpower: string,
        humidity_float: string,
    }

    let weather = ref<Partial<WeatherType>>({})

    onMounted(async () => {
        let ret = await getWeatherAPI()
        weather.value = ret?.data?.lives[0];
    })
</script>
    
<style lang="less">
    .sun{
        // background: url("@/assets//img//sun.jpg");
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background: linear-gradient(skyblue, rgb(244, 201, 122));
    }
</style>