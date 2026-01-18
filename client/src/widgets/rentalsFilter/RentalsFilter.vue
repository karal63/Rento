<script setup lang="ts">
    import { RENTAL_STATUS, type RentalStatus, type SortMethod } from '@/entities/rental';
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const emit = defineEmits<{
        (e: 'setStatus', status: RentalStatus | ''): void;
        (e: 'setSearch', status: string): void;
        (e: 'setSort', method: SortMethod): void;
    }>();
    defineProps<{
        status: RentalStatus | '';
        search: string;
        sort: SortMethod | null;
    }>();

    const isStatusDropdownOpen = ref(false);
    const isSortByDropdownOpen = ref(false);

    // translate it
    const statuses = [
        {
            label: t(`app.status.ALL`),
            callback: () => emit('setStatus', ''),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Completed}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Completed),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Cancelled}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Cancelled),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Active}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Active),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Pending}`),
            callback: () => emit('setStatus', RENTAL_STATUS.Pending),
        },
    ];

    const sortByList = [
        {
            label: t('app.sort.by_date_latest'),
            callback: () =>
                emit('setSort', {
                    field: 'createdAt',
                    order: 'desc',
                    label: t('app.sort.by_date_latest'),
                }),
        },
        {
            label: t('app.sort.by_date_oldest'),
            callback: () =>
                emit('setSort', {
                    field: 'createdAt',
                    order: 'asc',
                    label: t('app.sort.by_date_oldest'),
                }),
        },
    ];
</script>

<template>
    <section class="mt-5">
        <hr class="text-main-border" />

        <div class="mt-5 flex gap-5">
            <Input
                type="search"
                @input="$emit('setSearch', $event.target.value)"
                size="medium"
                :placeholder="t('app.sort.search')"
                icon="icon-park-outline:search"
            />

            <Dropdown
                :isOpen="isStatusDropdownOpen"
                :items="statuses"
                @close="isStatusDropdownOpen = false"
            >
                <Button
                    @click="isStatusDropdownOpen = !isStatusDropdownOpen"
                    size="sm"
                    color="transparent"
                    :disableUppercase="true"
                    class="h-full border border-main-border flex-between gap-2 w-44"
                >
                    {{ status ? status : t('app.protected_users_page.select_status') }}
                    <Icon
                        icon="weui:arrow-filled"
                        class="transform rotate-90 text-xl text-main-gray"
                    />
                </Button>
            </Dropdown>

            <Dropdown
                :isOpen="isSortByDropdownOpen"
                :items="sortByList"
                @close="isSortByDropdownOpen = false"
            >
                <Button
                    @click="isSortByDropdownOpen = !isSortByDropdownOpen"
                    size="sm"
                    color="transparent"
                    :disableUppercase="true"
                    class="h-full border border-main-border flex-between gap-2 w-72"
                >
                    {{ sort ? sort.label : t('app.sort.by_date_latest') }}
                    <Icon
                        icon="weui:arrow-filled"
                        class="transform rotate-90 text-xl text-main-gray"
                    />
                </Button>
            </Dropdown>
        </div>
    </section>
</template>
