<script setup lang="ts">
    import { FlyingPanel } from '@/shared/ui';

    defineProps<{
        isMobileMenuOpen: boolean;
    }>();
    defineEmits<{
        (e: 'close'): void;
    }>();
</script>

<template>
    <FlyingPanel :isOpen="isMobileMenuOpen" @close="$emit('close')">
        <h4 class="text-center text-xl font-semibold py-3 px-5">Rental</h4>
        <hr class="text-main-border" />

        <slot />
    </FlyingPanel>
</template>
