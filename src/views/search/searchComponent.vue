<template>
    <!--
      Heads up! 👋
    
      Plugins:
        - @tailwindcss/forms
    -->
    
    <div class="relative w-full h-full" ref="SearchRef">
        <label for="Search" class="sr-only"> Search </label>
        
        <input
            type="text"
            id="Search"
            placeholder="Search for..."
            class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm px-4 input-border"
            v-model="searchValue"
        />
        
        <span class="absolute inset-y-0 right-2 grid w-10 place-content-center" @click="searchHandle">
            <button type="button" class="text-gray-600 hover:text-gray-700">
            <span class="sr-only">Search</span>
        
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
            >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
            </svg>
            </button>
        </span>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";

    interface Emit{
        (ev : "search" , keywords : string) : void
    }

    const emit = defineEmits<Emit>();

    const SearchRef = ref<HTMLElement | null>(null);
    const searchValue = ref<string>("");
    const props = defineProps<{
        keyword : string
    }>();
    
    onMounted(() => {
        console.log(props.keyword);
        searchValue.value = props.keyword;
        SearchRef.value?.addEventListener("keydown", (event) =>
        {
            (event.key === "Enter") && searchHandle();
        })
    });

    const searchHandle = () => {
        emit("search", searchValue.value);
    }

</script>

<style scoped lang="less">
    .input-border{
        border : 2px solid #101010;
    }
    .input-border:focus{
        border : 2px solid steelblue;
        
    }

</style>