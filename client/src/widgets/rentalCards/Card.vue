<script setup lang="ts">
    import { Status, type RentalWithAllDetails } from '@/entities/rental';
    import { normalizeDate } from '@/shared/lib/date';
    import { Dropdown } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    defineProps<{
        rental: RentalWithAllDetails;
    }>();

    const isMenuOpen = ref(false);
</script>

<template>
    <li class="shadow border border-main-border p-3 rounded-md relative">
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

        <div class="absolute top-3 right-3">
            <Dropdown @close="isMenuOpen = false" :is-open="isMenuOpen" side="left">
                <button @click="isMenuOpen = !isMenuOpen" class="text-xl cursor-pointer">
                    <Icon icon="pepicons-pencil:dots-y" />
                </button>

                <template #actions>
                    <div class="bg-main-bg rounded-md">
                        <button
                            @click="console.log(rental)"
                            class="px-3 py-2 w-full text-left text-green-600 hover:bg-main-hover-bg cursor-pointer flex items-center gap-2 transition"
                        >
                            <Icon icon="material-symbols:add-rounded" class="text-xl" />
                            Pick
                        </button>
                    </div>
                </template>
            </Dropdown>
        </div>
    </li>
</template>
