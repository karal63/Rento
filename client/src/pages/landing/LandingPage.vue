<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { Button } from '../../shared/ui/button';
    import { useI18n } from 'vue-i18n';
    import Brands from './Brands.vue';
    import Spacer from './Spacer.vue';
    import KeyFeatures from './KeyFeatures.vue';
    import { darkBg, lightBg } from '@/shared/assets';

    import { useThemeStore } from '@/shared/model';

    const { t } = useI18n();
    const themeStore = useThemeStore();
</script>

<template>
    <div>
        <div
            class="h-screen bg-no-repeat bg-cover"
            :style="{
                backgroundImage: `url('${themeStore.isDark ? darkBg : lightBg}')`,
            }"
        >
            <div class="max-w-[1500px] m-auto pt-60">
                <div class="flex gap-5 items-center px-4">
                    <div class="w-1/2">
                        <h1 class="text-8xl font-extrabold multiline">
                            {{ t('app.landing_title') }}
                        </h1>
                        <p class="mt-10 text-xl text-gray-400 leading-8 max-w-4/5">
                            {{ t('app.landing_desc') }}
                        </p>

                        <Button class="mt-10">
                            <div
                                class="inline-flex gap-2 justify-center items-center text-lg tracking-widest"
                            >
                                {{ t('app.browse_offers') }}
                                <Icon icon="material-symbols:search-rounded" class="text-xl" />
                            </div>
                        </Button>
                    </div>
                    <div class="w-1/2">
                        <!-- <img src="../../shared/assets/car.png" alt="" /> -->
                    </div>
                </div>

                <Brands />
            </div>
        </div>

        <Spacer />
        <KeyFeatures />
    </div>
</template>
