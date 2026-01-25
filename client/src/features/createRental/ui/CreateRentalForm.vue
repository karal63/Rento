<script setup lang="ts">
    import { ref } from 'vue';
    import type { CreateUser } from '../model/types';
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useCreateRentalOptions } from '../model/useCreateRentalOptions';
    import type { Car } from '@/entities/car';
    import { DateRangePicker } from '@/features/selectDateRange';
    import type { User } from '@/entities/user';
    import useVuelidate from '@vuelidate/core';
    import { required } from '@vuelidate/validators';

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

    const { cars, users, userSearch, carSearch, isLoading } = useCreateRentalOptions();
    const isUsersOpen = ref(false);
    const isCarsOpen = ref(false);
    const rental = ref<CreateUser>({
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

    const selectCar = (car: Car) => {
        rental.value = {
            ...rental.value,
            car,
            period: {
                dateFrom: null,
                dateTo: null,
            },
        };
        isCarsOpen.value = false;
    };

    const selectUser = (user: User) => {
        rental.value.user = user;
        isUsersOpen.value = false;
    };

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (isValid) {
            console.log(rental.value);
        }
    };
</script>

<template>
    <section class="w-[50%]">
        <h1 class="text-4xl font-medium mb-10">Create a new rental</h1>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    1
                </div>
                <div>
                    <p class="text-base font-medium">Select user</p>
                    <p class="text-sm text-main-gray">
                        Choose the user to whom the rent will be registered
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
                    {{ rental.user?.name ?? 'Select user' }}
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
                                placeholder="Search"
                                icon="icon-park-outline:search"
                                size="medium"
                            />
                        </div>

                        <ul
                            v-if="users"
                            class="mt-3 divide-y divide-main-border max-h-[450px] overflow-y-scroll"
                        >
                            <li v-for="user in users" :key="user._id">
                                <button
                                    @click="selectUser(user)"
                                    class="w-full text-left py-2 px-3 hover:bg-main-hover-bg rounded-md transition cursor-pointer"
                                >
                                    {{ user.name }}
                                    <span class="text-sm ml-2 text-main-gray">
                                        {{ user.email }}
                                    </span>
                                </button>
                            </li>
                        </ul>

                        <div v-else-if="isLoading">Loading...</div>
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
                    <p class="text-base font-medium">Select car</p>
                    <p class="text-sm text-main-gray">
                        Choose the car that will be registered in this rental
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
                                placeholder="Search"
                                icon="icon-park-outline:search"
                                size="medium"
                            />
                        </div>

                        <ul
                            v-if="cars"
                            class="mt-3 divide-y divide-main-border max-h-[450px] overflow-y-scroll"
                        >
                            <li v-for="car in cars" :key="car._id">
                                <button
                                    @click="selectCar(car)"
                                    class="py-2 px-3 hover:bg-main-hover-bg rounded-md transition cursor-pointer w-full text-left"
                                >
                                    {{ car.name }}
                                </button>
                            </li>
                        </ul>

                        <div v-else-if="isLoading">Loading...</div>
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
                    <p class="text-base font-medium">Period</p>
                    <p class="text-sm text-main-gray">
                        Choose where and when user will receive the car
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

            <DateRangePicker
                :car="rental.car"
                @setPeriod="rental.period = $event"
                :period="rental.period"
            />
        </div>

        <div class="space-y-2 mb-6">
            <div class="flex items-end gap-3">
                <div
                    class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold"
                >
                    4
                </div>
                <div>
                    <p class="text-base font-medium">Pickup information</p>
                    <p class="text-sm text-main-gray">
                        Choose where and when user will receive the car
                    </p>
                    <p v-if="v$.pickupLocation.$errors.length" class="text-sm text-red-500">
                        pickup location: {{ v$.pickupLocation.$errors[0]?.$message }}
                    </p>

                    <p v-if="v$.pickupTime.$errors.length" class="text-sm text-red-500">
                        pickup time: {{ v$.pickupTime.$errors[0]?.$message }}
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
                <Button size="sm" color="transparent">Cancel</Button>
            </RouterLink>
            <Button @click="handleSubmit" :disabled="v$.$error" size="sm">Create</Button>
        </div>
    </section>
</template>

<!-- fix sidebar buttons & translate them -->
