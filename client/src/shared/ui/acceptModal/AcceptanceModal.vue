<script setup lang="ts">
    import { Button } from '../button';

    defineProps<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        onCancel: () => void;
    }>();
</script>

<template>
    <div
        @click.self="onCancel"
        v-if="isOpen"
        class="fixed z-20 left-0 top-0 w-full h-full bg-black/30 flex-center"
    >
        <div
            class="bg-main-bg border border-main-border rounded-xl w-full max-w-sm mx-auto p-6 shadow-lg"
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
        </div>
    </div>
</template>

<!-- create UI -->
