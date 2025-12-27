<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const { t } = useI18n();
</script>

<template>
    <section class="max-w-[1700px] m-auto 0 px-5 mt-24 sm:mt-32">
        <h1 class="text-3xl font-bold">{{ t('app.user_profile') }}</h1>

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
