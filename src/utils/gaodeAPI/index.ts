import AMapLoader from '@amap/amap-jsapi-loader';
import { get } from '../request';
import axios from "axios";

const __Gaode_API = 'https://restapi.amap.com/v3/weather/weatherInfo?parameters';

const PuTian_Code = 350300;



export async function getWeatherAPI()
{
    console.log("env : ", __Gaode_API + "&city=" + PuTian_Code + "&key=" + import.meta.env.VITE_GLOB_GAODE_API)
    return await axios.get(__Gaode_API + "&city=" + PuTian_Code + "&key=" + import.meta.env.VITE_GLOB_GAODE_API)
    // return await get({
    //     url : __Gaode_API + "&city=" + PuTian_Code + "&key=" + key
    // })
}