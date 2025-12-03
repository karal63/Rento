<script setup lang="ts">
    import { ref, watch } from 'vue';

    const isChecked = ref(false);

    const emit = defineEmits<{
        (e: 'addBrand', brand: string): void;
    }>();

    watch(isChecked, () => {
        if (isChecked.value) {
            emit('addBrand', 'Porsche');
        }
    });
</script>

<template>
    <div
        @click="isChecked = !isChecked"
        class="w-full text-left py-2 px-4 cursor-pointer flex items-center gap-3"
    >
        <button
            class="w-6 h-6 bg-main-hover-bg rounded-md border border-main-border cursor-pointer"
        >
            <div
                v-if="isChecked"
                class="w-full h-full bg-primary rounded-md flex-center text-white text-2xl"
            >
                ✓
            </div>
        </button>
        <p class="text-xl">Porsche</p>
    </div>
</template>
