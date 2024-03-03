<script setup lang="ts">
    import Login from "@/components/Login/login.vue";
    import Header from "@/views/header/header.vue";

</script>

<template>
    <div>
        <div class="top invisible"></div>
        <div class="fixed w-full h-1/10 bg-white z-40"><Header class="w-full h-full"/></div>
        <RouterView class="pt-24"/>
        <div class="fixed w-full h-full left-0 top-0 z-50 loginModel display-hide">
            <Login/>
        </div>
        
    </div>
    
</template>

<style scoped>
    .display-hide{
        display: none;
    }
</style>
