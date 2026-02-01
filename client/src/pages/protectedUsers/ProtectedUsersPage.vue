<script setup lang="ts">
    import { useUsersQuery } from '@/entities/user';
    import { CreateUserModal, useCreateUserStore } from '@/features/createUser';
    import { EditUserModal } from '@/features/editUser';
    import { useFilterUsers } from '@/features/filterUsers';
    import { useSortUsers } from '@/features/sortUsers';
    import { Button, type Breadcrumb } from '@/shared/ui';
    import { ProtectedHeader, UsersFilter } from '@/widgets';
    import { UsersTable } from '@/widgets/usersTable';
    import { Icon } from '@iconify/vue';
    import { computed, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const createUserStore = useCreateUserStore();

    const filters = useFilterUsers();
    const sorting = useSortUsers();
    const page = ref(1);

    const emit = defineEmits<{
        (e: 'setBreadcrumbs', data: Breadcrumb[]): void;
    }>();

    const breadcrumbs = [
        {
            label: t('app.protected_users_page.users'),
        },
    ];

    const queryParams = computed(() => ({
        ...filters,
        ...sorting,
        page: page.value,
    }));

    const { data, isLoading } = useUsersQuery(queryParams);
    const users = computed(() => data.value?.users ?? []);
    const pages = computed(() => data.value?.pages ?? 1);

    onMounted(async () => {
        emit('setBreadcrumbs', breadcrumbs);
    });
</script>

<template>
    <ProtectedHeader :title="t('app.protected_users_page.all_users')">
        <Button @click="createUserStore.openModal" size="sm" class="flex items-center gap-3">
            <Icon icon="material-symbols:add-rounded" class="text-xl" />
            {{ t('app.protected_users_page.new_user') }}
        </Button>
    </ProtectedHeader>

    <UsersFilter
        @set-search="filters.search = $event"
        @set-sort="sorting.sort = $event"
        :search="filters.search"
        :sort="sorting.sort"
    />

    <UsersTable v-model="page" :users="users" :loading="isLoading" :totalPages="pages" />

    <EditUserModal />
    <CreateUserModal />
</template>
