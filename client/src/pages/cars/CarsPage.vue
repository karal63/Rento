<script setup lang="ts">
    import { CarsList } from '@/entities/car';
    import { carsBg } from '@/shared/assets';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <div class="mt-20">
        <div
            :style="{
                backgroundImage: `url(${carsBg})`,
            }"
            class="bg-no-repeat bg-cover h-[350px] flex justify-center items-end pb-10 text-white font-extrabold text-8xl"
        >
            <div>{{ t('app.cars') }}</div>
        </div>
        <div class="max-w-[1500px] m-auto">
            <CarsList />
        </div>
    </div>
</template>
