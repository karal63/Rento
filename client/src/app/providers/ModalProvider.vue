<script setup lang="ts">
    import { useAcceptanceModalStore } from '@/features/acceptanceModal';
    import { AcceptanceModal } from '@/shared/ui';

    const modal = useAcceptanceModalStore();
</script>

<template>
    <AcceptanceModal
        :isOpen="modal.isOpen"
        :title="modal.title"
        :message="modal.message"
        :onConfirm="modal.confirm"
        :onCancel="modal.close"
    />
</template>
