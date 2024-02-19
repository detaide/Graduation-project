<script setup lang="ts">
    import Login from "@/components/Login/login.vue"
</script>

<template>
    <div>
        <RouterView/>
        <div class="fixed w-full h-full left-0 top-0 z-30 loginModel display-hide">
            <Login/>
        </div>
    </div>
    
</template>

<style scoped>
    .display-hide{
        display: none;
    }
</style>
