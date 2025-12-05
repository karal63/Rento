<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { keyFeatures } from '@/shared/const';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <section class="max-w-[1500px] m-auto my-52 px-5">
        <h1 class="text-5xl sm:text-6xl font-extrabold">
            {{ t('app.key_features') }}
        </h1>

        <p class="text-xl sm:text-2xl mt-5 mb-10 sm:my-13 text-main-gray">
            {{ t('app.key_features_desc') }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-10">
            <div
                v-for="feat in keyFeatures"
                :key="feat.id"
                class="border border-main-border rounded-xl p-8"
            >
                <div class="h-32">
                    <div
                        class="w-16 h-16 rounded-full flex-center"
                        :style="{
                            backgroundColor: feat.color,
                        }"
                    >
                        <Icon :icon="feat.icon" class="text-4xl" />
                    </div>
                </div>

                <div class="h-32 flex-col justify-end text-2xl font-bold">
                    <p class="w-2/3">{{ t(`app.${feat.text}`) }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
