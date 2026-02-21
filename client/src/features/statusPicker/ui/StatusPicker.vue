<script setup lang="ts">
    import { RENTAL_STATUS, type RentalStatus } from '@/entities/rental';
    import Dropdown from '@/shared/ui/dropdown/Dropdown.vue';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const props = defineProps<{
        status: RentalStatus | '' | undefined;
        placeholder?: string;
        allVariant?: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'setStatus', status: RentalStatus | ''): void;
    }>();

    const isStatusDropdownOpen = ref(false);

    const getIcon = computed(() => {
        if (props.status === RENTAL_STATUS.Active)
            return 'grommet-icons:time'; //fontisto:checkbox-active
        else if (props.status === RENTAL_STATUS.Cancelled)
            return 'material-symbols:chat-error-outline';
        else if (props.status === RENTAL_STATUS.Pending) return 'wi:time-7';
        else if (props.status === RENTAL_STATUS.Completed) return 'material-symbols:draft-outline';

        return 'lets-icons:filter-big';
    });

    const getClasses = computed(() => {
        if (props.status === RENTAL_STATUS.Active) {
            return 'bg-green-400/20 text-green-600 hover:bg-green-400/30 transition-all font-semibold';
        } else if (props.status === RENTAL_STATUS.Cancelled) {
            return 'bg-red-400/20 text-red-600 hover:bg-red-400/30 transition-all font-semibold';
        } else if (props.status === RENTAL_STATUS.Pending) {
            return 'bg-yellow-400/20 text-yellow-600 hover:bg-yellow-400/30 transition-all font-semibold';
        } else if (props.status === RENTAL_STATUS.Completed) {
            return 'bg-main-gray-bg text-opposite-theme/20 hover:bg-gray-400/30 transition-all font-semibold';
        }

        return 'bg-transparent border border-main-border hover:bg-gray-400/30 transition-all';
    });

    const statuses = [
        {
            label: t(`app.status.${RENTAL_STATUS.Active}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Active),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Pending}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Pending),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Cancelled}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Cancelled),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Completed}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Completed),
        },
    ];

    onMounted(() => {
        if (props.allVariant) {
            statuses.unshift({
                label: t(`app.status.ALL`),
                callback: () => emit('setStatus', ''),
            });
        }
    });
</script>

<template>
    <Dropdown
        :isOpen="isStatusDropdownOpen"
        @close="isStatusDropdownOpen = false"
        :items="statuses"
        class="max-w-max"
    >
        <button
            @click="isStatusDropdownOpen = !isStatusDropdownOpen"
            class="rounded-md px-4 py-2 flex-between gap-4 cursor-pointer h-full"
            :class="getClasses"
        >
            <p class="flex items-center gap-2">
                <Icon :icon="getIcon" />
                {{ status ? t(`app.status.${status}`) : placeholder }}
            </p>
            <Icon icon="weui:arrow-filled" class="transform rotate-90 text-xl text-main-gray" />
        </button>
    </Dropdown>
</template>
