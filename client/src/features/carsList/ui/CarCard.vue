<script setup lang="ts">
    import { Button } from '@/shared/ui/button';
    import { useI18n } from 'vue-i18n';
    import { useCarStore, type Car } from '@/entities/car';
    import { useRouter } from 'vue-router';

    const { t } = useI18n();
    const carStore = useCarStore();
    const router = useRouter();

    const props = defineProps<{
        car: Car;
    }>();

    const select = () => {
        carStore.selectCar(props.car);
        router.push(`/cars/${props.car._id}`);
    };
</script>

<template>
    <div
        class="shadow-xl shadow-main-border hover:shadow-md transition rounded-bl-xl rounded-br-md overflow-hidden"
    >
        <div @click="select" class="h-[300px] md:h-[400px]">
            <img
                :src="car.image"
                alt=""
                class="rounded-tl-xl rounded-tr-md h-full w-full object-cover"
            />
        </div>
        <div class="px-4 lg:px-8 py-10 flex-col justify-between">
            <div>
                <h1 class="text-2xl font-bold">{{ car.name }}</h1>

                <div class="mt-8 text-lg flex-col gap-3 text-main-gray">
                    <div class="flex-between">
                        <p>{{ t('app.acceleration') }}:</p>
                        <p>
                            {{ car.details.accelerationTo100 }}{{ t('app.s') }}
                            {{ t('app.to') }} 100 {{ t('app.km_h') }}
                        </p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.transmission') }}:</p>
                        <p>{{ car.details.transmission }}</p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.power') }}:</p>
                        <p>
                            {{ car.details.horsepower }} {{ t('app.hp') }} /
                            {{ car.details.torqueNm }} {{ t('app.nm') }}
                        </p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.number_of_seats') }}:</p>
                        <p>{{ car.details.numberOfSeats }}</p>
                    </div>
                </div>
            </div>

            <div class="lg:flex justify-between items-end">
                <div>
                    <p class="text-xl lg:text-3xl mt-8 font-bold text-primary">
                        {{ t('app.price_from') }}
                        {{ Math.floor(car.pricing.month / 30).toFixed(0) }}
                        {{ t('app.zl') }}
                    </p>
                    <p class="text-sm text-main-gray">{{ t('app.price_desc') }}</p>
                </div>

                <Button @click="select" class="w-full mt-5 lg:max-w-max">
                    {{ t('app.book_btn') }}
                </Button>
            </div>
        </div>
    </div>
</template>
