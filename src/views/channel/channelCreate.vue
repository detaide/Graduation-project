<!-- <template>
    
    <section class="bg-gray-100">
      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div class="lg:col-span-2 lg:py-12">
            <p class="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally independent from
              manufacturer and other group control gives you confidence that we will only recommend what
              is right for you.
            </p>
    
            <div class="mt-8">
              <a href="#" class="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>
    
              <address class="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
            </div>
          </div>
    
          <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <ChannelNew/>
                <ChannelItemNwe/>
          </div>
        </div>
      </div>
    </section>
  </template> -->

  <template>
  <div class="flex h-4/5 w-4/5 flex-col justify-between border-e bg-white">
    <div class="px-4 py-6 flex flec-row">
  
      <ul class="mt-6 space-y-1 w-1/5">

        <!-- <li v-for="(item, index) in navigationChoice" :key="index" @click="navhandle(item.type)">
            <div class="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 cursor-pointer" :class="">
                {{ item.name }}
            </div>
        </li> -->
        
        <li v-show="!props.channelId">
            <div class="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 cursor-pointer">
                新建频道
            </div>
        </li>

        <li v-show="props.channelId">
            <div class="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 cursor-pointer">
                新建帖子
            </div>
        </li>

      </ul>


      <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 w-full overflow-y-scroll h-screen max-h-800 scroll-hide px-10 pt-10">
            <ChannelNew v-show="!props.channelId"/>
            <ChannelItemNew v-show="props.channelId" :channelId="props.channelId"/>
      </div>
    </div>
  
  </div>
</template>


<script setup lang="ts">
    import ChannelNew from "./channelNew.vue";
    import ChannelItemNew from "./channelItemNew.vue"
  import { onMounted, ref } from "vue";

    const showType = ref(false);        // false channel | true channelItem
    const navigationChoice = [
        {
            name : "新建频道",
            type : false,
        },
        {
            name : "新建频道条目",
            type : true
        }
    ]
    const props = defineProps<{
      channelId? : number
    }>()

    const navhandle = (type : boolean) =>
    {
        console.log(showType.value);
        showType.value = type;
    }

    onMounted(() =>
    {
      console.log(props.channelId)
    })
</script>
