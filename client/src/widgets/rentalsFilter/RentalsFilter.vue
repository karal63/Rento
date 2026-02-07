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
    <section class="mt-5">
        <hr class="text-main-border" />

        <div class="mt-5 space-y-3 lg:space-y-0 lg:flex gap-x-5">
            <div>
                <Input
                    type="search"
                    @input="$emit('setSearch', $event.target.value)"
                    size="medium"
                    :placeholder="t('app.sort.search')"
                    icon="icon-park-outline:search"
                    class="w-full"
                />
            </div>

            <div class="flex gap-3">
                <StatusPicker
                    allVariant
                    :placeholder="t('app.protected_rentals_page.select_status')"
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
                        class="border border-main-border flex-between gap-2 text-sm md:text-base"
                    >
                        {{ sort ? sort.label : t('app.sort.by_date_latest') }}
                        <Icon
                            icon="weui:arrow-filled"
                            class="transform rotate-90 text-xl text-main-gray"
                        />
                    </Button>
                </Dropdown>
            </div>
        </div>
    </section>
</template>
