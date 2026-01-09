<script setup lang="ts">
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
</script>

<template>
    <section class="flex-between items-center">
        <h1 class="text-2xl font-semibold">All rentals</h1>

        <Button size="sm" class="flex items-center gap-3">
            <Icon icon="material-symbols:add-rounded" class="text-xl" />
            New Rental
        </Button>
    </section>
</template>
