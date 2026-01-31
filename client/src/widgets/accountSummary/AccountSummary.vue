<script setup lang="ts">
    import { hasPermission, UserSummary, useUserStore } from '@/entities/user';
    import { EditAccountModal, useEditAccountStore } from '@/features/editAccount';
    import { logout } from '@/features/auth/logout';
    import { Button } from '@/shared/ui';
    import { useI18n } from 'vue-i18n';

    const editAccountStore = useEditAccountStore();
    const userStore = useUserStore();
    const { t } = useI18n();
</script>

<template>
    <section>
        <UserSummary @edit="editAccountStore.open" />

        <div class="mt-5 flex justify-end gap-3">
            <RouterLink v-if="hasPermission('view:admin-page')" to="/admin/dashboard">
                <Button
                    v-if="userStore.isAuthenticated"
                    size="sm"
                    color="transparent"
                    class="border border-main-border"
                >
                    {{ t('app.link.dashboard') }}
                </Button>
            </RouterLink>

            <RouterLink v-if="hasPermission('view:employee-page')" to="/employee/dashboard">
                <Button
                    v-if="userStore.isAuthenticated"
                    size="sm"
                    color="transparent"
                    class="border border-main-border"
                >
                    {{ t('app.link.dashboard') }}
                </Button>
            </RouterLink>

            <Button
                v-if="userStore.isAuthenticated"
                @click="logout"
                size="sm"
                color="transparent"
                class="border border-red-500 text-red-500 hover:text-red-700 hover:border-red-700 hover:bg-transparent"
            >
                {{ t('app.logout') }}
            </Button>
        </div>
        <EditAccountModal />
    </section>
</template>
