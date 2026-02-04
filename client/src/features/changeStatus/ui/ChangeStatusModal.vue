<script setup lang="ts">
    import { Button, ModalTransition } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useChangeStatusModalStore } from '../model/changeStatusModalStore';
    import { CHANGE_STATUS, type ChangeStatus } from '@/entities/rental';
    import { useI18n } from 'vue-i18n';
    import { ref, watch } from 'vue';

    const changeStatusModalStore = useChangeStatusModalStore();
    const { t } = useI18n();

    const selectedStatus = ref<ChangeStatus | null>(null);

    const getClasses = (status: ChangeStatus, selected: ChangeStatus | null) => {
        const base =
            'flex items-center justify-between py-3 px-4 rounded-lg w-full text-left text-base transition-all font-medium border';

        const selectedRing =
            status === selected ? 'ring-2 ring-offset-2 ring-offset-main-bg ring-primary' : '';

        switch (status) {
            case CHANGE_STATUS.Active:
                return `${base} bg-green-400/15 text-green-600 border-green-400/30 hover:bg-green-400/25 ${selectedRing}`;
            case CHANGE_STATUS.Pending:
                return `${base} bg-yellow-400/15 text-yellow-600 border-yellow-400/30 hover:bg-yellow-400/25 ${selectedRing}`;
            case CHANGE_STATUS.Completed:
                return `${base} bg-main-gray-bg text-opposite-theme/70 border-main-border hover:bg-gray-400/20 ${selectedRing}`;
        }
    };

    const handleClose = () => {
        changeStatusModalStore.close();
        selectedStatus.value = null;
    };

    const handleSave = () => {
        changeStatusModalStore.save(selectedStatus.value);
        selectedStatus.value = null;
    };

    watch(
        () => changeStatusModalStore.rental,
        () => {
            if (!changeStatusModalStore.rental) return;
            selectedStatus.value = changeStatusModalStore.rental?.status as ChangeStatus;
        },
        { deep: true }
    );
</script>

<template>
    <ModalTransition
        :is-open="changeStatusModalStore.isOpen"
        @cancel="changeStatusModalStore.close"
    >
        <div
            class="relative w-[320px] bg-main-bg border border-main-border px-6 pt-5 pb-6 rounded-xl shadow-xl"
        >
            <!-- Header -->
            <div class="flex items-center justify-between pb-4">
                <h2 class="text-xl font-semibold">Change status</h2>
                <button
                    @click="handleClose"
                    class="hover:bg-main-hover-bg p-1.5 rounded-md transition"
                >
                    <Icon icon="material-symbols-light:close" class="text-2xl" />
                </button>
            </div>

            <!-- Status list -->
            <ul class="flex flex-col gap-2">
                <li v-for="status in CHANGE_STATUS" :key="status">
                    <button
                        class="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        :class="getClasses(status, selectedStatus)"
                        @click="selectedStatus = status"
                    >
                        <span>{{ t(`app.status.${status}`) }}</span>

                        <Icon
                            v-if="selectedStatus === status"
                            icon="material-symbols:check-circle"
                            class="text-xl opacity-80"
                        />
                    </button>
                </li>
            </ul>

            <!-- Footer -->
            <div class="flex justify-end gap-2 pt-5">
                <Button size="sm" color="transparent" @click="handleClose">Cancel</Button>
                <Button size="sm" :disabled="!selectedStatus" @click="handleSave">Save</Button>
            </div>
        </div>
    </ModalTransition>
</template>
