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
            class="bg-no-repeat bg-cover px-5 mt-24 bg-center"
            :style="{
                backgroundImage: `url('${themeStore.isDark ? darkBg : lightBg}')`,
            }"
        >
            <div class="max-w-[1500px] m-auto pt-24">
                <div class="flex gap-5 items-center">
                    <div class="w-full lg:w-1/2">
                        <h1 class="text-7xl sm:text-8xl font-extrabold multiline">
                            {{ t('app.landing_title') }}
                        </h1>
                        <p
                            class="my-10 text-lg md:text-xl text-main-gray leading-7 md:leading-8 max-w-4/5"
                        >
                            {{ t('app.landing_desc') }}
                        </p>

                        <RouterLink to="/cars">
                            <Button>
                                <div class="inline-flex gap-2 justify-center items-center text-lg">
                                    {{ t('app.browse_offers') }}
                                    <Icon icon="material-symbols:search-rounded" class="text-xl" />
                                </div>
                            </Button>
                        </RouterLink>
                    </div>
                </div>

                <Brands />
            </div>
        </div>

        <Spacer />
        <KeyFeatures />
    </div>
</template>
