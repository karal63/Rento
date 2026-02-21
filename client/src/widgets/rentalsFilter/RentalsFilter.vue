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

        <div class="mt-5 flex gap-3 flex-wrap">
            <div class="w-full lg:max-w-md">
                <Input
                    type="search"
                    @input="$emit('setSearch', $event.target.value)"
                    size="medium"
                    :placeholder="t('app.sort.search')"
                    icon="icon-park-outline:search"
                />
            </div>

            <div class="w-full lg:max-w-max">
                <StatusPicker
                    allVariant
                    :placeholder="t('app.protected_rentals_page.select_status')"
                    @setStatus="emit('setStatus', $event)"
                    :status="status"
                />
            </div>

            <!-- Sort By -->
            <div class="w-full md:w-auto md:min-w-[200px]">
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
                        class="w-full h-full border border-main-border flex items-center justify-between gap-3 px-4 py-2"
                    >
                        <span class="truncate">
                            {{ sort ? sort.label : t('app.sort.by_date_latest') }}
                        </span>

                        <Icon
                            icon="weui:arrow-filled"
                            class="rotate-90 text-lg text-main-gray shrink-0"
                        />
                    </Button>
                </Dropdown>
            </div>
        </div>
    </section>
</template>
