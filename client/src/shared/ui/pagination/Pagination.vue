<script setup lang="ts">
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';

    const page = defineModel<number>({ required: true });

    const props = defineProps<{
        total: number;
    }>();

    const pages = computed<number[]>(() => {
        return Array.from({ length: props.total }, (_, i) => i + 1);
    });

    const goTo = (p: number) => (page.value = p);
</script>

<template>
    <div class="flex items-center justify-end gap-2 mt-5 mb-10 py-6 select-none">
        <Button size="sm" :disabled="page === 1" @click="goTo(page - 1)">
            <Icon icon="weui:arrow-filled" class="transform rotate-180 text-xl" />
        </Button>

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

        <Button size="sm" :disabled="page === total" @click="goTo(page + 1)">
            <Icon icon="weui:arrow-filled" class="transform text-xl" />
        </Button>
    </div>
</template>
