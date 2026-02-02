<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    defineProps<{
        isOpen: boolean;
    }>();
    const emit = defineEmits<{
        (e: 'close'): void;
    }>();
</script>

<template>
    <Transition name="backdrop">
        <div v-if="isOpen" class="fixed inset-0 bg-black/40 z-20" @click="emit('close')" />
    </Transition>

    <Transition name="sheet">
        <section
            v-if="isOpen"
            ref="panelRef"
            class="fixed bottom-0 left-0 z-30 w-full bg-main-bg border-t border-main-border shadow-[0_-10px_30px_rgba(0,0,0,0.15)] pb-8 rounded-tl-4xl rounded-tr-4xl"
        >
            <slot />

            <button
                @click="emit('close')"
                class="absolute right-2 top-2 cursor-pointer hover:bg-main-hover-bg p-1 rounded-md"
            >
                <Icon icon="material-symbols-light:close" class="text-2xl" />
            </button>
        </section>
    </Transition>
</template>

<style scoped>
    .backdrop-enter-active,
    .backdrop-leave-active {
        transition: opacity 0.25s ease;
    }
    .backdrop-enter-from,
    .backdrop-leave-to {
        opacity: 0;
    }

    .sheet-enter-active,
    .sheet-leave-active {
        transition: transform 0.3s ease;
    }
    .sheet-enter-from,
    .sheet-leave-to {
        transform: translateY(100%);
    }
</style>
