<script setup lang="ts">
    import type { SortMethod } from '@/entities/rental';
    import { USER_ROLE, type UserRole } from '@/entities/user';
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const role = defineModel<UserRole | ''>('role');

    const emit = defineEmits<{
        (e: 'setSearch', status: string): void;
        (e: 'setSort', method: SortMethod): void;
    }>();
    defineProps<{
        search: string;
        sort: SortMethod | null;
    }>();

    const isSortByDropdownOpen = ref(false);
    const isRoleDropdownOpen = ref(false);

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

    const rolesList = [
        {
            label: t(`app.role.all`),
            callback: () => (role.value = ''),
        },
        {
            label: t(`app.role.${USER_ROLE.Admin}`),
            callback: () => (role.value = USER_ROLE.Admin),
        },
        {
            label: t(`app.role.${USER_ROLE.Employee}`),
            callback: () => (role.value = USER_ROLE.Employee),
        },
        {
            label: t(`app.role.${USER_ROLE.User}`),
            callback: () => (role.value = USER_ROLE.User),
        },
    ];
</script>

<template>
    <section class="mt-5">
        <hr class="text-main-border" />

        <div class="mt-5 md:flex gap-5 space-y-3 md:space-y-0">
            <div>
                <Input
                    type="search"
                    @input="$emit('setSearch', $event.target.value)"
                    size="medium"
                    :placeholder="t('app.sort.search')"
                    icon="icon-park-outline:search"
                />
            </div>

            <div class="h-12">
                <Dropdown
                    :isOpen="isRoleDropdownOpen"
                    :items="rolesList"
                    @close="isRoleDropdownOpen = false"
                    class="max-w-max"
                >
                    <Button
                        @click="isRoleDropdownOpen = !isRoleDropdownOpen"
                        size="sm"
                        color="transparent"
                        :disableUppercase="true"
                        class="h-full border border-main-border flex-between gap-4 py-2"
                    >
                        <div class="flex items-center gap-2">
                            <Icon icon="lets-icons:filter-big" />
                            {{
                                role
                                    ? t(`app.role.${role}`)
                                    : t('app.protected_users_page.select_role')
                            }}
                        </div>
                        <Icon
                            icon="weui:arrow-filled"
                            class="transform rotate-90 text-xl text-main-gray"
                        />
                    </Button>
                </Dropdown>
            </div>

            <div class="h-12">
                <Dropdown
                    :isOpen="isSortByDropdownOpen"
                    :items="sortByList"
                    @close="isSortByDropdownOpen = false"
                    class="max-w-max"
                >
                    <Button
                        @click="isSortByDropdownOpen = !isSortByDropdownOpen"
                        size="sm"
                        color="transparent"
                        :disableUppercase="true"
                        class="h-full border border-main-border flex-between gap-2 w-72 py-2"
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
