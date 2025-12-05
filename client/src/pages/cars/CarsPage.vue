<script setup lang="ts">
    import { CarsList } from '@/features/car/carsList/ui';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <div>
        <div class="max-w-[1700px] m-auto 0 px-5">
            <div class="mt-40 font-extrabold text-6xl lg:text-8xl">
                <div>{{ t('app.cars_page_title') }}</div>
            </div>
            <div class="mt-20">
                <CarsList />
            </div>
        </div>
    </div>
</template>
