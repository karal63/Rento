<script setup lang="ts">
    import type { RentalStatus, SortMethod } from '@/entities/rental';
    import { StatusPicker } from '@/features/statusPicker';
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

    const isSortByDropdownOpen = ref(false);

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
    <section class="mt-5 overflow-x-scroll">
        <hr class="text-main-border" />

        <div class="mt-5 flex gap-5">
            <Input
                type="search"
                @input="$emit('setSearch', $event.target.value)"
                size="medium"
                :placeholder="t('app.sort.search')"
                icon="icon-park-outline:search"
            />

            <StatusPicker
                allVariant
                :placeholder="t('app.protected_users_page.select_status')"
                @setStatus="emit('setStatus', $event)"
                :status="status"
            />

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
