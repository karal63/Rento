<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t, locale } = useI18n();

    const open = ref(false);
</script>

<template>
    <nav class="my-5">
        <div class="max-w-[1900px] m-auto flex items-center flex-between">
            <h3 class="text-3xl">{{ t('app.name') }}</h3>

            <div class="flex items-center gap-3">
                <button
                    class="inline-flex justify-center items-center rounded-md bg-transparent px-3 h-10 hover:bg-mainHoverDarkBg transition cursor-pointer"
                >
                    <Icon icon="fontisto:day-sunny" class="text-xl" />
                </button>

                <!-- separate reusable UI element | move into shared dir -->
                <div class="relative inline-block text-left">
                    <!-- make fixed height or ask how to not set fixed height but have both elements same height -->
                    <button
                        @click="open = !open"
                        class="inline-flex gap-1 justify-center items-center rounded-md bg-transparent px-5 h-10 hover:bg-mainHoverDarkBg transition cursor-pointer"
                    >
                        EN
                        <Icon class="text-xl" icon="iconamoon:arrow-down-2-light" />
                    </button>

                    <transition name="fade">
                        <div
                            v-if="open"
                            class="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-lg bg-mainHoverOnGray shadow-lg ring-1 ring-black ring-opacity-5"
                        >
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm">PL</a>
                                <a href="#" class="block px-4 py-2 text-sm">DE</a>
                            </div>
                        </div>
                    </transition>
                </div>

                <!-- separate reusable UI element | move into shared dir -->
                <button
                    class="px-5 h-10 rounded-md bg-blue-500 hover:bg-blue-400 transition cursor-pointer"
                >
                    LOG IN
                </button>
            </div>
        </div>
    </nav>
</template>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.15s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
