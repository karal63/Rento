<script setup lang="ts">
    import { EditRentalModal } from '@/features/editRental';
    import { RentalsList } from '@/features/rentalsList';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <section>
        <h1 class="text-2xl mb-5">{{ t('app.rentals_page.active_title') }}</h1>
        <RentalsList status="active" />

        <h1 class="text-2xl mt-10 mb-5">{{ t('app.rentals_page.pending_title') }}</h1>
        <RentalsList status="pending" />

        <h1 class="text-2xl mt-10 mb-5">{{ t('app.rentals_page.complited_title') }}</h1>
        <RentalsList status="completed" />

        <h1 class="text-2xl mt-10 mb-5">{{ t('app.rentals_page.cancelled_title') }}</h1>
        <RentalsList status="cancelled" />

        <EditRentalModal />
    </section>
</template>
