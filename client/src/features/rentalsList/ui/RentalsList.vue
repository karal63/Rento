<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';

    const props = defineProps<{
        status: 'active' | 'past';
    }>();

    const getClasses = computed(() => {
        if (props.status === 'active') {
            return 'border-green-500/20 bg-green-500/10 hover:border-green-500/40';
        }

        return 'border-main-border bg-main-gray-bg';
    });
</script>

<template>
    <ul>
        <li class="group relative border rounded-md p-5" :class="getClasses">
            <div class="flex items-center gap-5">
                <img src="../../shared/assets/logos/bmw.png" alt="" class="h-20" />

                <div>
                    <h3 class="text-xl mb-2 font-bold">BMW M4CS Competition</h3>

                    <div class="flex gap-8">
                        <div>
                            <h3 class="flex gap-1">
                                <span class="text-main-gray">Status:</span>
                                <span class="font-semibold text-green-500">Active</span>
                            </h3>
                            <h3 class="flex gap-1">
                                <span class="text-main-gray">Rental Period:</span>
                                <span>02.01.2026 - 05.01.2026</span>
                            </h3>
                        </div>

                        <div>
                            <h3 class="flex gap-1">
                                <span class="text-main-gray">Total price:</span>
                                <span>1300 PLN</span>
                            </h3>
                            <h3 class="flex gap-1">
                                <span class="text-main-gray">Pickup:</span>
                                <span>Airport at 09:00</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div
                class="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
            >
                <button
                    class="p-2 rounded-md transition hover:bg-main-border text-main-gray hover:text-white cursor-pointer"
                    title="Edit rental"
                >
                    <Icon icon="iconoir:edit" class="text-2xl" />
                </button>

                <button
                    class="p-2 rounded-md hover:bg-red-500/10 text-red-500 cursor-pointer"
                    title="Cancel rental"
                >
                    <Icon icon="iconoir:trash" class="text-2xl" />
                </button>
            </div>
        </li>
    </ul>
</template>
