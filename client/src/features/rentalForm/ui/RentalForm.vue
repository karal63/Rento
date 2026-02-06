<script setup lang="ts">
    import { ref } from 'vue';
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useRentalOptions } from '../model/useRentalOptions';
    import type { Car } from '@/entities/car';
    import type { User } from '@/entities/user';
    import useVuelidate, { type ValidationArgs } from '@vuelidate/core';
    import type { RentalFormType } from '../model/types';
    import { useI18n } from 'vue-i18n';

    const rental = defineModel<RentalFormType>('rental', { required: true });

    const props = defineProps<{
        rules: ValidationArgs<RentalFormType>;
    }>();

    const emit = defineEmits<{
        (e: 'handleSubmit'): void;
    }>();

    const { t } = useI18n();
    const { cars, users, employees, userSearch, carSearch, employeeSearch, isLoading } =
        useRentalOptions();

    const isEmployeesOpen = ref(false);
    const isUsersOpen = ref(false);
    const isCarsOpen = ref(false);

    const v$ = useVuelidate(props.rules, rental);

    const selectCar = (car: Car) => {
        rental.value.car = car;
        rental.value.period.dateFrom = null;
        rental.value.period.dateTo = null;

        isCarsOpen.value = false;
    };

    const selectUser = (user: User) => {
        rental.value.user = user;
        isUsersOpen.value = false;
    };

    const selectEmployee = (employee: User) => {
        isEmployeesOpen.value = false;
        rental.value.employee = employee;
    };

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        emit('handleSubmit');
    };
</script>

<template>
    <section class="w-full lg:w-1/2">
        <slot name="header" />

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    1
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.rental_form.select_employee') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.rental_form.select_employee_desc') }}
                    </p>
                    <p v-for="e in v$.employee.$errors" :key="e.$uid" class="text-sm text-red-500">
                        {{ e.$message }}
                    </p>
                </div>
            </div>

            <Dropdown :is-open="isEmployeesOpen" @close="isEmployeesOpen = false">
                <Button
                    @click="isEmployeesOpen = !isEmployeesOpen"
                    size="sm"
                    color="transparent"
                    disable-uppercase
                    class="border border-main-border w-full flex-between"
                >
                    {{ rental.employee?.email ?? t('app.rental_form.select_employee') }}
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
                                v-model="employeeSearch"
                                :placeholder="t('app.search')"
                                icon="icon-park-outline:search"
                                size="medium"
                            />
                        </div>

                        <ul
                            class="mt-3 divide-y divide-main-border max-h-[450px] overflow-y-scroll"
                        >
                            <li v-for="employee in employees?.users" :key="employee._id">
                                <button
                                    @click="selectEmployee(employee)"
                                    :disabled="isLoading"
                                    class="w-full text-left py-2 px-3 hover:bg-main-border rounded-md transition cursor-pointer"
                                    :class="isLoading && 'text-current/50'"
                                >
                                    {{ employee.name }} {{ employee.secondName }}
                                    <span
                                        class="text-sm ml-2"
                                        :class="isLoading ? 'text-main-gray/50' : 'text-main-gray'"
                                    >
                                        {{ employee.email }}
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
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.rental_form.select_user') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.rental_form.select_user_desc') }}
                    </p>
                    <p v-for="e in v$.user.$errors" :key="e.$uid" class="text-sm text-red-500">
                        {{ e.$message }}
                    </p>
                </div>
            </div>

            <Dropdown :is-open="isUsersOpen" @close="isUsersOpen = false">
                <Button
                    @click="isUsersOpen = !isUsersOpen"
                    size="sm"
                    color="transparent"
                    disable-uppercase
                    class="border border-main-border w-full flex-between"
                >
                    {{ rental.user?.name ?? t('app.rental_form.select_user') }}
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
                            <li v-for="user in users?.users" :key="user._id">
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
                    3
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.rental_form.select_car') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.rental_form.select_car_desc') }}
                    </p>
                    <p v-for="e in v$.car.$errors" :key="e.$uid" class="text-sm text-red-500">
                        {{ e.$message }}
                    </p>
                </div>
            </div>
            <Dropdown :is-open="isCarsOpen" @close="isCarsOpen = false">
                <Button
                    @click="isCarsOpen = !isCarsOpen"
                    size="sm"
                    color="transparent"
                    disable-uppercase
                    class="border border-main-border w-full flex-between"
                >
                    {{ rental.car?.name ?? t('app.rental_form.select_car') }}
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
                    4
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.rental_form.select_period') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.rental_form.select_period_desc') }}
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
                    5
                </div>
                <div>
                    <p class="text-sm md:text-base font-medium">
                        {{ t('app.rental_form.pickup_information') }}
                    </p>
                    <p class="text-xs md:text-sm text-main-gray">
                        {{ t('app.rental_form.pickup_information_desc') }}
                    </p>
                    <p v-if="v$.pickupLocation.$errors.length" class="text-sm text-red-500">
                        {{ t('app.rental_form.pickup_location') }}:
                        {{ v$.pickupLocation.$errors[0]?.$message }}
                    </p>

                    <p v-if="v$.pickupTime.$errors.length" class="text-sm text-red-500">
                        {{ t('app.rental_form.time') }}:
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
                {{ t('app.button.submit') }}
            </Button>
        </div>
    </section>
</template>
