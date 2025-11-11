<script setup lang="ts">
    import { Button } from '@/shared/ui/button';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <div class="shadow-xl hover:shadow-md transition rounded-bl-xl rounded-br-md cursor-pointer">
        <div>
            <img
                src="https://cylindersi.pl/wp-content/uploads/2022/08/Lamborghini-Huracan-Evo-Sylwetka.jpg"
                alt=""
                class="rounded-tl-xl rounded-tr-md"
            />
        </div>
        <div class="h-[400px] px-8 py-10 flex-col justify-between">
            <div>
                <h1 class="text-2xl font-bold">Lamborghini Huracán EVO</h1>

                <div class="mt-8 text-lg flex-col gap-3 text-main-gray">
                    <div class="flex-between">
                        <p>{{ t('app.acceleration') }}:</p>
                        <p>2,9 s do 100km/h</p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.transmission') }}:</p>
                        <p>Auto</p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.power') }}:</p>
                        <p>640 KM / 600 Nm</p>
                    </div>
                    <div class="flex-between">
                        <p>{{ t('app.number_of_seats') }}:</p>
                        <p>2</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-end">
                <div>
                    <p class="text-xl mt-8 font-bold text-red-700">
                        {{ t('app.price_from') }} 1500 zł
                    </p>
                    <p class="text-sm text-main-gray">{{ t('app.price_desc') }}</p>
                </div>

                <Button>{{ t('app.book_btn') }}</Button>
            </div>
        </div>
    </div>
</template>
