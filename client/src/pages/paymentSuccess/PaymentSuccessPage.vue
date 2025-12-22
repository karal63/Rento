<script setup lang="ts">
    import { PaymentSuccess } from '@/features/paymentSuccess';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <div class="min-h-screen bg-main-bg flex items-center justify-center p-4">
        <div class="max-w-xl w-full">
            <PaymentSuccess />

            <p class="text-center text-xs text-gray-500 mt-6">
                {{ t('app.payment_success_subdesc') }} support@rento.com
            </p>
        </div>
    </div>
</template>
