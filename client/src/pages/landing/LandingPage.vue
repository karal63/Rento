<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { Button } from '../../shared/ui/button';
    import { useI18n } from 'vue-i18n';

    const { t, locale } = useI18n();
</script>

<template>
    <div>
        <div class="max-w-[1500px] m-auto flex mt-36 gap-5 items-center px-4">
            <div class="w-1/2">
                <h1 class="text-8xl font-extrabold">
                    Premium
                    <br />
                    Car Rental
                    <br />
                    In Warsaw
                </h1>
                <p class="mt-10 text-xl text-gray-400 leading-8 max-w-4/5">
                    Here you’ll find the car you’ve always dreamed of — a thrilling and stylish ride
                    that fits your budget without compromising on quality or value.
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
                <img src="../../shared/assets/car.png" alt="" />
            </div>
        </div>
    </div>
</template>
