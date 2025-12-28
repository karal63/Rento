<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { Button } from '../button';
    import ModalTransition from '../modalTransition/ModalTransition.vue';

    defineProps<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        onCancel: () => void;
    }>();
</script>

<template>
    <ModalTransition :isOpen="isOpen" :onCancel="onCancel">
        <div
            class="delay-500 relative bg-main-bg border border-main-border rounded-xl w-full max-w-sm mx-auto p-6 shadow-lg"
        >
            <!-- Title -->
            <h2 class="text-center text-xl md:text-2xl font-semibold mb-2">{{ title }}</h2>

            <!-- Message -->
            <p class="text-center text-sm md:text-base text-main-gray">{{ message }}</p>

            <!-- Actions -->
            <div class="flex gap-3 mt-8">
                <Button
                    @click="onCancel"
                    size="md"
                    color="transparent"
                    class="flex-1 border border-main-border"
                >
                    Back
                </Button>

                <Button @click="onConfirm" size="md" color="red" class="flex-1">Confirm</Button>
            </div>

            <button
                @click="onCancel"
                class="absolute right-3 top-3 cursor-pointer hover:bg-main-hover-bg p-1 rounded-md"
            >
                <Icon icon="material-symbols-light:close" class="text-xl" />
            </button>
        </div>
    </ModalTransition>
</template>
