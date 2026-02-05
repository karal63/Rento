<script setup lang="ts">
    defineProps<{
        isOpen: boolean;
        onCancel: () => void;
    }>();
</script>

<template>
    <Transition name="modal">
        <div
            v-if="isOpen"
            @click.self="onCancel"
            class="fixed z-30 left-0 top-0 w-full h-full bg-black/30 flex-center"
        >
            <slot />
        </div>
    </Transition>
</template>

<style scoped>
    .modal-enter-active {
        transition: all 0.25s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(1.1);
    }
</style>
