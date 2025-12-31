<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    // api call
</script>

<template>
    <section>
        <div class="flex-between gap-5">
            <div class="w-1/2 grid grid-cols-2">
                <div class="bg-primary rounded-md p-4">
                    <!-- icon -->
                    <div class="w-12 h-12 rounded-full bg-white flex-center">
                        <Icon icon="material-symbols-light:car-rental" class="text-2xl" />
                    </div>

                    <h3 class="text-white font-bold text-xl mt-2">10</h3>
                    <p class="text-main-gray-bg">Acrive rentals</p>
                </div>
            </div>
            <div class="w-1/2"></div>
        </div>
    </section>
</template>
