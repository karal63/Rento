<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useCreateRentalOptions } from '../model/useCreateRentalOptions';
    import type { Car } from '@/entities/car';
    import type { User } from '@/entities/user';
    import useVuelidate from '@vuelidate/core';
    import { required } from '@vuelidate/validators';
    import { useRouter } from 'vue-router';
    import { useCreateRentalMutation } from '@/entities/rental';
    import type { CreateRental } from '../model/types';
    import { buildCreateRentalPayload } from '../model/buildCreateRentalPayload';
    import { showDialog, showErrorDialog } from '@/features/dialog/@x';
    import type { AppError } from '@/shared/model';
    import { useI18n } from 'vue-i18n';

    const props = defineProps<{
        period: {
            dateFrom: Date | null;
            dateTo: Date | null;
        };
    }>();

    const emit = defineEmits<{
        (e: 'setCar', car: Car): void;
    }>();

    const rules = {
        user: { required },
        car: { required },
        period: {
            dateFrom: { required },
            dateTo: { required },
        },
        pickupLocation: { required },
        pickupTime: { required },
    };

    const { t } = useI18n();
    const router = useRouter();
    const { cars, users, userSearch, carSearch, isLoading } = useCreateRentalOptions();

    const isUsersOpen = ref(false);
    const isCarsOpen = ref(false);
    const rental = ref<CreateRental>({
        user: null,
        car: null,
        period: {
            dateFrom: null,
            dateTo: null,
        },
        pickupLocation: '',
        pickupTime: '',
    });
    const v$ = useVuelidate(rules, rental);
    const createRentalMutation = useCreateRentalMutation();

    const selectCar = (car: Car) => {
        rental.value = {
            ...rental.value,
            car,
            period: {
                dateFrom: null,
                dateTo: null,
            },
        };
        emit('setCar', car);
        isCarsOpen.value = false;
    };

    const selectUser = (user: User) => {
        rental.value.user = user;
        isUsersOpen.value = false;
    };

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        const payload = buildCreateRentalPayload(rental.value);
        if (!payload) return;

        try {
            await createRentalMutation.mutateAsync(payload);
            showDialog(
                'success',
                t('app.message.rental_created'),
                t('app.message.rental_created_desc', { name: rental.value.user?.name })
            );
            router.push('/admin/rentals');
        } catch (error) {
            console.log(error);
            showErrorDialog(error as AppError);
        }
    };

    watch(
        () => props.period,
        () => {
            rental.value = {
                ...rental.value,
                period: props.period,
            };
        }
    );
</script>

<template>
    <section class="w-[50%]">
        <h1 class="text-4xl font-medium mb-10">{{ t('app.create_rental_page.title') }}</h1>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    1
                </div>
                <div>
                    <p class="text-base font-medium">
                        {{ t('app.create_rental_page.select_user') }}
                    </p>
                    <p class="text-sm text-main-gray">
                        {{ t('app.create_rental_page.select_user_desc') }}
                    </p>
                    <p v-for="e in v$.user.$errors" :key="e.$uid" class="text-sm text-red-500">
                        {{ e.$message }}
                    </p>
                </div>
            </div>

            <Dropdown :is-open="isUsersOpen" @close="isUsersOpen = false" class="w-2/3">
                <Button
                    @click="isUsersOpen = !isUsersOpen"
                    size="sm"
                    color="transparent"
                    disable-uppercase
                    class="border border-main-border w-full flex-between"
                >
                    {{ rental.user?.name ?? t('app.create_rental_page.select_user') }}
                    <Icon
                        icon="weui:arrow-filled"
                        class="transform rotate-90 text-xl text-main-gray"
                    />
                </Button>
                <template #actions>
                    <div class="p-3">
                        <div>
                            <Input
                                type="search"
                                v-model="userSearch"
                                :placeholder="t('app.search')"
                                icon="icon-park-outline:search"
                                size="medium"
                            />
                        </div>

                        <ul
                            class="mt-3 divide-y divide-main-border max-h-[450px] overflow-y-scroll"
                        >
                            <li v-for="user in users" :key="user._id">
                                <button
                                    @click="selectUser(user)"
                                    :disabled="isLoading"
                                    class="w-full text-left py-2 px-3 hover:bg-main-border rounded-md transition cursor-pointer"
                                    :class="isLoading && 'text-current/50'"
                                >
                                    {{ user.name }}
                                    <span
                                        class="text-sm ml-2"
                                        :class="isLoading ? 'text-main-gray/50' : 'text-main-gray'"
                                    >
                                        {{ user.email }}
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </template>
            </Dropdown>
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    2
                </div>
                <div>
                    <p class="text-base font-medium">
                        {{ t('app.create_rental_page.select_car') }}
                    </p>
                    <p class="text-sm text-main-gray">
                        {{ t('app.create_rental_page.select_car_desc') }}
                    </p>
                    <p v-for="e in v$.car.$errors" :key="e.$uid" class="text-sm text-red-500">
                        {{ e.$message }}
                    </p>
                </div>
            </div>
            <Dropdown :is-open="isCarsOpen" @close="isCarsOpen = false" class="w-2/3">
                <Button
                    @click="isCarsOpen = !isCarsOpen"
                    size="sm"
                    color="transparent"
                    disable-uppercase
                    class="border border-main-border w-full flex-between"
                >
                    {{ rental.car?.name ?? 'Select car' }}
                    <Icon
                        icon="weui:arrow-filled"
                        class="transform rotate-90 text-xl text-main-gray"
                    />
                </Button>
                <template #actions>
                    <div class="p-3">
                        <div>
                            <Input
                                type="search"
                                v-model="carSearch"
                                :placeholder="t('app.search')"
                                icon="icon-park-outline:search"
                                size="medium"
                            />
                        </div>

                        <ul
                            class="mt-3 divide-y divide-main-border max-h-[450px] overflow-y-scroll"
                        >
                            <li v-for="car in cars" :key="car._id">
                                <button
                                    @click="selectCar(car)"
                                    :disabled="isLoading"
                                    class="py-2 px-3 hover:bg-main-hover-bg rounded-md transition cursor-pointer w-full text-left"
                                    :class="isLoading && 'text-current/50'"
                                >
                                    {{ car.name }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </template>
            </Dropdown>
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    3
                </div>
                <div>
                    <p class="text-base font-medium">
                        {{ t('app.create_rental_page.select_period') }}
                    </p>
                    <p class="text-sm text-main-gray">
                        {{ t('app.create_rental_page.select_period_desc') }}
                    </p>
                    <p
                        v-for="e in v$.period.dateFrom.$errors"
                        :key="e.$uid"
                        class="text-sm text-red-500"
                    >
                        {{ e.$message }}
                    </p>
                </div>
            </div>

            <slot />
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    4
                </div>
                <div>
                    <p class="text-base font-medium">
                        {{ t('app.create_rental_page.pickup_information') }}
                    </p>
                    <p class="text-sm text-main-gray">
                        {{ t('app.create_rental_page.pickup_information_desc') }}
                    </p>
                    <p v-if="v$.pickupLocation.$errors.length" class="text-sm text-red-500">
                        {{ t('app.create_rental_page.pickup_location') }}:
                        {{ v$.pickupLocation.$errors[0]?.$message }}
                    </p>

                    <p v-if="v$.pickupTime.$errors.length" class="text-sm text-red-500">
                        {{ t('app.create_rental_page.time') }}:
                        {{ v$.pickupTime.$errors[0]?.$message }}
                    </p>
                </div>
            </div>

            <div class="flex gap-3">
                <Input
                    v-model="rental.pickupLocation"
                    size="medium"
                    placeholder="Airport"
                    class="w-2/3"
                />
                <Input type="time" v-model="rental.pickupTime" size="medium" class="w-1/3" />
            </div>
        </div>

        <div class="mb-6 space-x-2 flex justify-end">
            <RouterLink to="/admin/rentals">
                <Button size="sm" color="transparent">{{ t('app.button.cancel') }}</Button>
            </RouterLink>
            <Button @click="handleSubmit" :disabled="v$.$error" size="sm">
                {{ t('app.button.create') }}
            </Button>
        </div>
    </section>
</template>
