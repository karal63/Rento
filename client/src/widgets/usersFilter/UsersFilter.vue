<script setup lang="ts">
    import type { SortMethod } from '@/entities/rental';
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

    const emit = defineEmits<{
        (e: 'setSearch', status: string): void;
        (e: 'setSort', method: SortMethod): void;
    }>();
    defineProps<{
        search: string;
        sort: SortMethod | null;
    }>();

    const isSortByDropdownOpen = ref(false);

    const sortByList = [
        {
            label: 'By date (latest first)',
            callback: () =>
                emit('setSort', {
                    field: 'createdAt',
                    order: 'desc',
                    label: 'By date (latest first)',
                }),
        },
        {
            label: 'By date (oldest first)',
            callback: () =>
                emit('setSort', {
                    field: 'createdAt',
                    order: 'asc',
                    label: 'By date (oldest first)',
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
                placeholder="Search"
                icon="icon-park-outline:search"
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
                    class="h-full border border-main-border flex-between gap-2 w-56"
                >
                    {{ sort ? sort.label : 'By date (latest first)' }}
                    <Icon
                        icon="weui:arrow-filled"
                        class="transform rotate-90 text-xl text-main-gray"
                    />
                </Button>
            </Dropdown>
        </div>
    </section>
</template>
