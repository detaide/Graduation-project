<template >
    <div class="flex items-center justify-center">
        <input type="text" class="input-focus-border px-2 py-2 rounded input-border text-xs w-52" placeholder="搜索"/>
        <button class="bg-blue w-8 h-8 rounded flex items-center justify-center ml-1">
            <Icon size="20" color="white">
                <Search/>
            </Icon>
        </button>
    </div>
</template>
<script setup lang="ts">
    import {Search} from "@vicons/ionicons5";
    import {Icon} from "@vicons/utils";
</script>
    
<style lang="less" scoped>
    .input-border{
        outline: 1px solid @color-input-border;
    }
    .input-focus-border:focus{
        outline: 1px solid @color-bottom-blue;
    }
    .bg-blue{
        background-color: @color-blue;
    }
    
</style>