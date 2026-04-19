<script setup lang="ts">
    import { Button, Input } from '@/shared/ui';
    import { useVuelidate } from '@vuelidate/core';
    import { useI18n } from 'vue-i18n';
    import CarDetails from './CarDetails.vue';
    import Pricing from './Pricing.vue';
    import { useRouter } from 'vue-router';
    import { carRules, type CarFormType } from '@/entities/car';
    import { Icon } from '@iconify/vue';
    import { uploadImage } from '@/shared/lib/upload';

    const { t } = useI18n();
    const router = useRouter();

    const car = defineModel<CarFormType>({ required: true });

    const emit = defineEmits<{
        (e: 'submit'): void;
    }>();

    const v$ = useVuelidate(carRules, car);

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (isValid) {
            emit('submit');
            router.push('/admin/cars');
        }
    };

    const handleUpload = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (!target.files || target.files?.length === 0) return;

        const images = (await uploadImage(target.files)) ?? [];

        car.value.images = [...car.value.images, ...images];
    };

    const removeImage = (selectedImg: string) => {
        car.value.images = car.value.images.filter(img => img !== selectedImg);
    };
</script>

<template>
    <section class="xl:w-2/3 2xl:w-1/2">
        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    1
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_name') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_name_desc') }}
                    </p>
                </div>
            </div>
            <div class="space-y-3 lg:flex lg:space-y-0 gap-3">
                <div class="w-full lg:w-1/4">
                    <Input
                        size="medium"
                        v-model="car.brand"
                        :is-error="v$.brand.$error"
                        :placeholder="t('app.car_form.car_brand')"
                        testid="car-brand-input"
                    />
                    <p v-if="v$.brand.$error" class="mt-1 text-sm text-red-500">
                        {{ t(`app.car_form.${v$.brand.$errors[0]?.$uid}`) }}
                    </p>
                </div>
                <div class="w-full lg:w-3/4">
                    <Input
                        size="medium"
                        v-model="car.name"
                        testid="car-full-name-input"
                        :is-error="v$.name.$error"
                        :placeholder="t('app.car_form.car_full_name')"
                    />
                    <p v-if="v$.name.$error" class="mt-1 text-sm text-red-500">
                        {{ t(`app.car_form.${v$.name.$errors[0]?.$uid}`) }}
                    </p>
                </div>
            </div>
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    2
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_images') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_images_desc') }}
                    </p>
                </div>
            </div>

            <p v-if="v$.images.$error" class="mt-1 text-sm text-red-500">
                {{ t(`app.car_form.${v$.images.$errors[0]?.$uid}`) }}
            </p>

            <div class="py-2 grid grid-cols-3 max-w-max lg:grid-cols-5 gap-3">
                <div v-for="img in car.images" :key="img" class="group w-[125px] h-[75px] relative">
                    <img :src="img" :alt="img" class="rounded-md h-full w-full object-cover" />

                    <button
                        @click="removeImage(img)"
                        class="md:opacity-0 group-hover:opacity-100 transition absolute -right-3 -top-3 cursor-pointer bg-main-gray-bg hover:bg-main-hover-bg p-1 rounded-md"
                    >
                        <Icon icon="material-symbols-light:close" class="text-xl" />
                    </button>
                </div>
            </div>

            <div
                class="relative border rounded-md w-1/2"
                :class="v$.images.$error ? 'border-red-500' : 'border-main-border'"
            >
                <input
                    type="file"
                    data-testid="car-images-input"
                    @change="handleUpload"
                    multiple
                    class="absolute inset-0 opacity-0 cursor-pointer"
                />

                <div class="pl-10 py-2 pointer-events-none text-gray-500">
                    {{ t('app.car_form.select_image') }}
                </div>

                <Icon
                    icon="proicons:attach"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-xl"
                />
            </div>
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    3
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_details') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_details_desc') }}
                    </p>
                </div>
            </div>

            <CarDetails v-model="car" :v$="v$" />
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    4
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.car_form.car_pricing') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.car_form.car_pricing_desc') }}
                    </p>
                </div>
            </div>

            <div>
                <h4 class="text-lg mt-4 mb-1 flex items-center gap-3">
                    {{ t('app.car_form.deposit') }} ({{ t('app.zl') }})
                    <p v-if="v$.deposit.$error" class="mt-1 text-sm text-red-500">
                        {{ t(`app.car_form.${v$.deposit.$errors[0]?.$uid}`) }}
                    </p>
                </h4>
                <Input
                    type="number"
                    v-model="car.deposit"
                    :is-error="v$.deposit.$error"
                    size="medium"
                    placeholder="30000"
                    testid="car-deposit-input"
                />
            </div>

            <div class="mt-4">
                <h4 class="text-lg mt-4 mb-1">
                    {{ t('app.car_form.pricing_periods') }}
                </h4>

                <Pricing v-model="car" :v$="v$" />
            </div>
        </div>

        <div class="mb-6 space-x-2 flex justify-end">
            <RouterLink to="/admin/cars">
                <Button size="sm" color="transparent">{{ t('app.button.cancel') }}</Button>
            </RouterLink>
            <Button
                @click="handleSubmit"
                :disabled="v$.$error"
                size="sm"
                data-testid="car-submit-btn"
            >
                {{ t('app.button.submit') }}
            </Button>
        </div>
    </section>
</template>
