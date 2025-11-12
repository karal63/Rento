<script setup lang="ts">
    import { Button } from '@/shared/ui/button';
    import { useI18n } from 'vue-i18n';
    import { useCarStore, type Car, type PriceRange } from '@/entities/car';
    import { useRouter } from 'vue-router';

    const { t } = useI18n();
    const carStore = useCarStore();
    const router = useRouter();

    const props = defineProps<{
        car: Car;
    }>();

    const select = () => {
        carStore.selectCar(props.car);
        router.push(`/cars/${props.car.id}`);
    };
</script>

<template>
    <div
        @click="select"
        class="shadow-xl hover:shadow-md transition rounded-bl-xl rounded-br-md cursor-pointer"
    >
        <div>
            <img :src="car.image" alt="" class="rounded-tl-xl rounded-tr-md" />
        </div>
        <div class="h-[400px] px-8 py-10 flex-col justify-between">
            <div>
                <h1 class="text-2xl font-bold">{{ car.name }}</h1>

                <div class="mt-8 text-lg flex-col gap-3 text-main-gray">
                    <div class="flex-between">
                        <p>{{ t('app.acceleration') }}:</p>
                        <p>{{ car.details.acceleration }}</p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.transmission') }}:</p>
                        <p>{{ car.details.transmission }}</p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.power') }}:</p>
                        <p>{{ car.details.power }}</p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.number_of_seats') }}:</p>
                        <p>{{ car.details.numberOfSeats }}</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-end">
                <div>
                    <p class="text-xl mt-8 font-bold text-red-700">
                        {{ t('app.price_from') }}
                        {{ (car.pricing[car.pricing.length - 1] as PriceRange).price / 30 }} zł
                    </p>
                    <p class="text-sm text-main-gray">{{ t('app.price_desc') }}</p>
                </div>

                <Button>{{ t('app.book_btn') }}</Button>
            </div>
        </div>
    </div>
</template>
