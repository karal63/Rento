<script setup lang="ts">
    import { Button } from '@/shared/shadcn/ui/button';
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
        <Button variant="outline" size="icon-lg" :disabled="page === 1" @click="goTo(page - 1)">
            <Icon icon="weui:arrow-filled" class="transform rotate-180" />
        </Button>

        <Button
            size="icon-lg"
            v-for="p in pages"
            :key="p"
            @click="goTo(p)"
            :class="{
                'bg-primary text-white ': p === page,
                'bg-secondary hover:bg-main-hover-bg': p !== page,
            }"
        >
            {{ p }}
        </Button>

        <Button variant="outline" size="icon-lg" :disabled="page === total" @click="goTo(page + 1)">
            <Icon icon="weui:arrow-filled" />
        </Button>
    </div>
</template>
