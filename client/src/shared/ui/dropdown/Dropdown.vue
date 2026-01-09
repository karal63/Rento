<script setup lang="ts">
    defineProps<{
        isOpen: boolean;
        items: string[];
    }>();

    defineEmits<{
        (e: 'setStatus', value: string): void;
    }>();
</script>

<template>
    <div class="relative">
        <slot />

        <Transition name="dropdown">
            <div
                v-if="isOpen"
                class="absolute top-[110%] left-0 border border-main-border bg-main-bg shadow w-full rounded-md"
            >
                <ul class="divide-y divide-main-border">
                    <li v-for="item in items" :key="item">
                        <button
                            @click="$emit('setStatus', item)"
                            class="w-full text-left py-2 px-3 text-sm cursor-pointer hover:bg-main-hover-bg transition capitalize"
                        >
                            {{ item }}
                        </button>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .dropdown-enter-active {
        transition: all 0.25s ease;
    }

    .dropdown-enter-from,
    .dropdown-leave-to {
        opacity: 0;
        transform: scale(0.9) translateY(-10px);
    }
</style>
