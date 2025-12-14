<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps({
        modelValue: { type: Number, required: true },
        total: { type: Number, required: true },
    });

    const emit = defineEmits(['update:modelValue']);

    const page = computed(() => props.modelValue);

    const pages = computed(() => {
        return Array.from({ length: props.total }, (_, i) => i + 1);
    });

    const goTo = (p: number) => emit('update:modelValue', p);
</script>

<template>
    <div class="flex items-center justify-end gap-2 mt-5 mb-10 py-6 select-none">
        <!-- Prev Button -->
        <button
            class="px-4 py-2 rounded-xl border border-main-border disabled:opacity-40 hover:bg-main-hover-bg transition cursor-pointer"
            :disabled="page === 1"
            @click="goTo(page - 1)"
        >
            Prev
        </button>

        <!-- Page Numbers -->
        <button
            v-for="p in pages"
            :key="p"
            @click="goTo(p)"
            class="w-10 h-10 flex items-center justify-center rounded-xl border border-main-border transition cursor-pointer"
            :class="{
                'bg-primary text-white border-primary': p === page,
                'hover:bg-main-hover-bg': p !== page,
            }"
        >
            {{ p }}
        </button>

        <!-- Next Button -->
        <button
            class="px-4 py-2 rounded-xl border border-main-border disabled:opacity-40 hover:bg-main-hover-bg transition cursor-pointer"
            :disabled="page === total"
            @click="goTo(page + 1)"
        >
            Next
        </button>
    </div>
</template>
