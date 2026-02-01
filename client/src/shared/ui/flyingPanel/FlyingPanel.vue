<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { onClickOutside } from '@vueuse/core';
    import { ref } from 'vue';

    defineProps<{
        isOpen: boolean;
    }>();
    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    const panelRef = ref<HTMLElement | null>();
    onClickOutside(panelRef, () => emit('close'));
</script>

<template>
    <Transition name="modal">
        <section
            ref="panelRef"
            v-if="isOpen"
            class="fixed bottom-0 left-0 w-full bg-main-bg z-20 border-t border-main-border shadow-[0_-10px_10px_0_rgba(0,0,0,0.1)] pb-8 rounded-tl-4xl rounded-tr-4xl"
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
    .modal-enter-active,
    .modal-leave-to {
        transition: all 0.25s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(1.1) translateY(100%);
    }
</style>
