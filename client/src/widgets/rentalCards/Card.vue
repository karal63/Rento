<script setup lang="ts">
    import { Status, type RentalWithAllDetails } from '@/entities/rental';
    import { normalizeDate } from '@/shared/lib/date';

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    defineProps<{
        rental: RentalWithAllDetails;
    }>();
</script>

<template>
    <li class="shadow border bg-main-gray-bg border-main-border p-3 rounded-md relative">
        <Status :status="rental.status">
            {{ t(`app.status.${rental.status}`) }}
        </Status>

        <h3 class="my-3">
            {{ `${normalizeDate(rental.rentFrom)} - ${normalizeDate(rental.rentTo)}` }}
        </h3>

        <ul class="flex-col gap-1 text-sm text-main-gray">
            <li>
                {{ rental.carId.name }}
            </li>
            <li>
                {{ rental.pickupLocation }} {{ t('app.tickets_page.at') }} {{ rental.pickupTime }}
            </li>
        </ul>

        <slot name="actions" v-bind="{ rental }" />
    </li>
</template>
