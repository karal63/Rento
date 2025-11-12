<script setup lang="ts">
    import { CarsList } from '@/features/car/carsList/ui';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <div>
        <div class="max-w-[1900px] m-auto 0">
            <div class="mt-40 font-extrabold text-8xl">
                <div>{{ t('app.cars_page_title') }}</div>
            </div>
            <div class="flex gap-8 mt-20">
                <div class="w-[20%] h-[600px] sticky top-24"></div>
                <CarsList />
            </div>
        </div>
    </div>
</template>

<!-- solve problem with architecuture, it cannot be so complicated -->
