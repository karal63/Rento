<script setup lang="ts">
    import { Button, Input, ModalTransition } from '@/shared/ui';
    import { useEditRentalStore } from '../model/editRentalStore';
    import { ref, watch } from 'vue';
    import { Icon } from '@iconify/vue';

    const editRentalStore = useEditRentalStore();

    const time = ref('');
    const location = ref('');

    watch(
        () => editRentalStore.rental,
        () => {
            if (!editRentalStore.rental) return;

            location.value = editRentalStore.rental?.pickupLocation;
            time.value = editRentalStore.rental?.pickupTime;
        }
    );
</script>

<template>
    <ModalTransition :isOpen="editRentalStore.isOpen" :onCancel="editRentalStore.close">
        <div class="relative bg-main-bg border-main-border p-8 rounded-md w-sm md:w-xl">
            <h1 class="text-center text-xl md:text-2xl font-semibold mb-2">Edit rental</h1>

            <form @submit.prevent="editRentalStore.edit(time, location)" class="flex-col gap-3">
                <label>
                    <span class="text-main-gray text-sm mb-1">Pickup time</span>
                    <Input v-model="time" type="time" size="medium" class="w-full" />
                </label>

                <label>
                    <span class="text-main-gray text-sm mb-1">Pickup location</span>
                    <Input v-model="location" size="medium" class="w-full" />
                </label>

                <Button type="submit" size="sm" class="w-full mt-5">Edit</Button>
            </form>

            <button
                @click="editRentalStore.close"
                class="absolute right-3 top-3 cursor-pointer hover:bg-main-hover-bg p-1 rounded-md"
            >
                <Icon icon="material-symbols-light:close" class="text-xl" />
            </button>
        </div>
    </ModalTransition>
</template>
