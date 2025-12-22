<script setup lang="ts">
    import { CarsList } from '@/features/carsList';
    import { Breadcrumbs } from '@/shared/ui';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const breadcrumbs = computed(() => [
        { label: t('app.footer.home'), href: '/' },
        { label: t('app.cars') },
    ]);
</script>

<template>
    <div>
        <div class="max-w-[1700px] m-auto 0 px-5 mt-24 sm:mt-32">
            <Breadcrumbs :breadcrumbs="breadcrumbs" />

            <div class="font-extrabold text-6xl lg:text-8xl">
                <div>{{ t('app.cars_page_title') }}</div>
            </div>
            <div class="mt-15">
                <CarsList />
            </div>
        </div>
    </div>
</template>
