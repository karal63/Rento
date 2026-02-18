<script setup lang="ts">
    import { Button, Input } from '@/shared/ui';
    import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
    import { useI18n } from 'vue-i18n';
    import CarDetails from './CarDetails.vue';
    import Pricing from './Pricing.vue';
    import { useRouter } from 'vue-router';
    import type { CarFormType } from '@/entities/car';
    import { Icon } from '@iconify/vue';
    import { uploadImage } from '@/shared/lib/upload';

    const { t } = useI18n();
    const router = useRouter();

    const car = defineModel<CarFormType>({ required: true });

    const props = defineProps<{
        rules: ValidationArgs<CarFormType>;
    }>();

    const emit = defineEmits<{
        (e: 'submit'): void;
    }>();

    const v$ = useVuelidate(props.rules, car);

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (isValid) {
            emit('submit');
            router.push('/admin/cars');
        }
    };

    const handleUpload = async (e: Event) => {
        await uploadImage(e.target.files);
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
                    />
                    <p
                        v-for="e in v$.brand.$errors"
                        :key="e.$uid"
                        class="mt-1 text-sm text-red-500"
                    >
                        {{ e.$message }}
                    </p>
                </div>
                <div class="w-full lg:w-3/4">
                    <Input
                        size="medium"
                        v-model="car.name"
                        :is-error="v$.name.$error"
                        :placeholder="t('app.car_form.car_full_name')"
                    />
                    <p v-for="e in v$.name.$errors" :key="e.$uid" class="mt-1 text-sm text-red-500">
                        {{ e.$message }}
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

            <p v-for="e in v$.image.$errors" :key="e.$uid" class="mt-1 text-sm text-red-500">
                {{ e.$message }}
            </p>

            <!-- <Input
                size="medium"
                v-model="car.image"
                :is-error="v$.image.$error"
                placeholder="URL to image"
            /> -->
            <div
                class="relative border rounded-md w-1/2"
                :class="v$.image.$error ? 'border-red-500' : 'border-main-border'"
            >
                <input
                    type="file"
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
                    <p class="mt-1 text-sm text-red-500">
                        {{ v$.deposit.$error ? v$.deposit.$errors[0]?.$message : '' }}
                    </p>
                </h4>
                <Input
                    type="number"
                    v-model="car.deposit"
                    :is-error="v$.deposit.$error"
                    size="medium"
                    placeholder="30000"
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
            <Button @click="handleSubmit" :disabled="v$.$error" size="sm">
                {{ t('app.button.submit') }}
            </Button>
        </div>
    </section>
</template>

<!-- fix behavior when after clicking edit button inputs are empty -->
<!-- after clicking edit twice this happens -->
