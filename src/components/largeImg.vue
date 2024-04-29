<template >
    <div>
        <img :src="props.largeImgSrc" class="large-img"  alt="">
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        largeImgSrc : string
    }>()
</script>
<style lang="less" scoped>
    .large-img{
        max-height: 80vh;
        min-height:60vh;
        width: auto;
        display : block;
        margin : 0 auto;
    }
</style>