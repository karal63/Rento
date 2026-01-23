<script setup lang="ts">
    import { ref } from 'vue';
    // import type { CreateUser } from '../model/types';
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useCreateRentalOptions } from '../model/useCreateRentalOptions';

    const { cars, carSearch, isLoading } = useCreateRentalOptions();

    // const rental = ref<CreateUser>({
    //     userId: '',
    //     carId: '',
    //     period: {
    //         from: '',
    //         to: '',
    //     },
    //     pickupLocation: '',
    //     pickupTime: '',
    // });

    const isUsersOpen = ref(false);
    const isCarsOpen = ref(false);
</script>

<template>
    <section class="w-[40%]">
        <h1 class="text-4xl font-medium mb-10">Create a new rental</h1>

        <div class="flex items-center gap-3 mb-4 text-xl">
            <div class="rounded-full w-8 h-8 bg-primary flex-center text-white">1</div>
            <p class="text-xl">Select the user to whom the rent will be registered</p>
        </div>
        <Dropdown :is-open="isUsersOpen" class="w-full">
            <Button
                @click="isUsersOpen = !isUsersOpen"
                size="sm"
                color="transparent"
                class="border border-main-border w-full flex-between"
            >
                Select user
                <Icon icon="weui:arrow-filled" class="transform rotate-90 text-xl text-main-gray" />
            </Button>
            <template #actions>
                <div class="p-3">
                    <div>
                        <Input
                            type="search"
                            placeholder="Search"
                            icon="icon-park-outline:search"
                            size="medium"
                        />
                    </div>

                    <ul class="mt-3 divide-y divide-main-border max-h-[450px] overflow-y-scroll">
                        <li
                            class="py-2 px-3 hover:bg-main-hover-bg rounded-md transition cursor-pointer"
                        >
                            Leo
                        </li>
                        <li
                            class="py-2 px-3 hover:bg-main-hover-bg rounded-md transition cursor-pointer"
                        >
                            Someone
                        </li>
                    </ul>
                </div>
            </template>
        </Dropdown>

        <div class="flex items-center gap-3 mt-8 mb-4 text-xl">
            <div class="rounded-full w-8 h-8 bg-primary flex-center text-white">2</div>
            <p class="text-xl">Select car</p>
        </div>

        <Dropdown :is-open="isCarsOpen" class="w-full">
            <Button
                @click="isCarsOpen = !isCarsOpen"
                size="sm"
                color="transparent"
                class="border border-main-border w-full flex-between"
            >
                Select car
                <Icon icon="weui:arrow-filled" class="transform rotate-90 text-xl text-main-gray" />
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
                        v-if="cars && carSearch.length > 0"
                        class="mt-3 divide-y divide-main-border max-h-[450px] overflow-y-scroll"
                    >
                        <li
                            v-for="car in cars"
                            :key="car._id"
                            class="py-2 px-3 hover:bg-main-hover-bg rounded-md transition cursor-pointer"
                        >
                            {{ car.name }}
                        </li>
                    </ul>

                    <div v-else-if="isLoading">Loading...</div>
                </div>
            </template>
        </Dropdown>
    </section>
</template>
