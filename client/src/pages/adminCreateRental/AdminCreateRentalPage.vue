<script setup lang="ts">
    import type { Breadcrumb } from '@/shared/ui';
    import { CreateRental } from '@/widgets/createRental';
    import { onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.protected_rentals_page.rentals'),
            href: '/admin/rentals',
        },
        {
            label: t('app.rental_form.new'),
        },
    ];

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });
</script>

<template>
    <section class="flex-between gap-8">
        <CreateRental />
    </section>
</template>
