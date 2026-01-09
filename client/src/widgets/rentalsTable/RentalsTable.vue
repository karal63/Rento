<script setup lang="ts">
    import type { RentalWithAllDetails } from '@/entities/rental';
    import { Icon } from '@iconify/vue';
    import { ref, watch } from 'vue';

    const props = defineProps<{
        rows: RentalWithAllDetails[];
        loading: boolean;
    }>();

    const editedRentals = ref<RentalWithAllDetails[]>([]);
    const isMenuOpen = ref(false);

    watch(
        () => props.rows,
        () => {
            editedRentals.value = props.rows;
        }
    );
</script>

<template>
    <section class="mt-10">
        <table class="w-full">
            <thead>
                <tr class="text-main-gray font-semibold text-sm">
                    <td class="bg-main-gray-bg rounded-tl-md rounded-bl-md pl-6 py-2 w-[35%]">
                        <div class="flex items-center gap-2">
                            Name
                            <button class="cursor-pointer">
                                <Icon
                                    icon="material-symbols:code-rounded"
                                    class="transform rotate-90"
                                />
                            </button>
                        </div>
                    </td>
                    <td class="bg-main-gray-bg pl-3 py-3 w-[15%] border-l border-main-border">
                        <div class="flex items-center gap-2">
                            Status
                            <button class="cursor-pointer">
                                <Icon
                                    icon="material-symbols:code-rounded"
                                    class="transform rotate-90"
                                />
                            </button>
                        </div>
                    </td>
                    <td class="bg-main-gray-bg pl-3 py-3 w-[15%] border-l border-main-border">
                        <div class="flex items-center gap-2">
                            Created At
                            <button class="cursor-pointer">
                                <Icon
                                    icon="material-symbols:code-rounded"
                                    class="transform rotate-90"
                                />
                            </button>
                        </div>
                    </td>
                    <td class="bg-main-gray-bg pl-3 py-3 w-[15%] border-l border-main-border">
                        <div class="flex items-center gap-2">
                            Updated At
                            <button class="cursor-pointer">
                                <Icon
                                    icon="material-symbols:code-rounded"
                                    class="transform rotate-90"
                                />
                            </button>
                        </div>
                    </td>
                    <td class="bg-main-gray-bg pl-3 py-3 w-[15%] border-l border-main-border">
                        <div class="flex items-center gap-2">
                            Created By
                            <button class="cursor-pointer">
                                <Icon
                                    icon="material-symbols:code-rounded"
                                    class="transform rotate-90"
                                />
                            </button>
                        </div>
                    </td>
                    <td class="bg-main-gray-bg rounded-tr-md rounded-br-md pl-3 py-3 w-[5%]"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading">loading...</tr>
                <tr
                    v-else
                    v-for="rental in editedRentals"
                    :key="rental._id"
                    class="border-b border-main-border text-sm"
                >
                    <td class="w-[35%] px-3 py-4">
                        <p
                            class="text-base font-bold hover:text-main-gray transition cursor-pointer"
                        >
                            {{ rental.carId.name }}
                        </p>
                    </td>

                    <td class="w-[15%] px-3 py-4">
                        <span
                            class="font-bold px-2 py-1 rounded-md"
                            :class="
                                rental.status === 'CONFIRMED'
                                    ? 'bg-green-400/20 text-green-600'
                                    : 'bg-red-400/20 text-red-600'
                            "
                        >
                            {{ rental.status }}
                        </span>
                    </td>

                    <td class="w-[15%] px-3 py-4">
                        <p class="">{{ new Date(rental.createdAt).toLocaleString() }}</p>
                    </td>

                    <td class="w-[15%] px-3 py-4">
                        <p>{{ new Date(rental.updatedAt).toLocaleString() }}</p>
                    </td>

                    <td class="w-[15%] px-3 py-4">
                        <p>{{ rental.userId.name }}</p>
                    </td>

                    <td>
                        <div class="flex-center">
                            <div class="relative">
                                <button
                                    @click="isMenuOpen = !isMenuOpen"
                                    class="text-xl cursor-pointer"
                                >
                                    <Icon icon="pepicons-pencil:dots-y" />
                                </button>

                                <div
                                    v-if="isMenuOpen"
                                    class="absolute right-full top-full h-10 w-[100px] border border-main-border bg-main-gray-bg"
                                >
                                    <slot name="actions" :rental="rental" />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
