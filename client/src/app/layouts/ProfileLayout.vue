<script setup lang="ts">
    import { hasPermission } from '@/entities/auth';
    import { useUserStore } from '@/entities/user';
    import { logout } from '@/features/auth/logout';
    import { Button } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const { t } = useI18n();
    const userStore = useUserStore();
</script>

<template>
    <section class="max-w-[1700px] m-auto 0 px-5 mt-24 sm:mt-32">
        <div class="flex-between">
            <h1 class="text-3xl font-bold">{{ t('app.user_profile') }}</h1>

            <div class="flex gap-3">
                <RouterLink
                    v-if="hasPermission(userStore.user, 'view:admin-page')"
                    to="/admin/dashboard"
                >
                    <Button v-if="userStore.isAuthenticated" size="sm">ADMIN</Button>
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
        </div>

        <ul class="flex items-center gap-5 mt-8 text-lg">
            <li>
                <RouterLink
                    to="/profile/account"
                    class="flex items-center gap-1 border-b-2 py-1 px-3 transition border-main-gray"
                    :class="
                        route.fullPath === '/profile/account'
                            ? 'border-main-gray'
                            : 'border-transparent'
                    "
                >
                    <Icon icon="mdi-light:account" class="text-2xl" />
                    {{ t('app.account') }}
                </RouterLink>
            </li>
            <li>
                <RouterLink
                    to="/profile/rentals"
                    class="flex items-center gap-1 border-b-2 py-1 px-3 transition"
                    :class="
                        route.fullPath === '/profile/rentals'
                            ? 'border-main-gray'
                            : 'border-transparent'
                    "
                >
                    <Icon icon="material-symbols-light:car-rental" class="text-2xl" />
                    {{ t('app.rentals') }}
                </RouterLink>
            </li>
        </ul>

        <hr class="text-main-border" />

        <section class="mt-5">
            <RouterView />
        </section>
    </section>
</template>
