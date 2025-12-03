<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import CheckboxItem from './CheckboxItem.vue';

    const isDropdownOpen = ref(false);

    defineEmits<{
        (e: 'addBrand', brand: string): void;
    }>();
</script>

<template>
    <div class="relative">
        <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="border border-main-border rounded-md w-full py-2 text-lg flex-between px-4 cursor-pointer"
        >
            <span>All brands</span>
            <Icon icon="mdi:chevron-down" class="text-2xl" />
        </button>

        <div
            v-if="isDropdownOpen"
            class="absolute top-[110%] left-0 border border-main-border bg-main-bg shadow-sm shadow-main-border rounded-md w-full"
        >
            <CheckboxItem @addBrand="$emit('addBrand', $event)" />
        </div>
    </div>
</template>
