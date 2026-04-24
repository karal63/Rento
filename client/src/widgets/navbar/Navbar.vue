<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { Button } from '../../shared/ui/button';
    import { languages } from '@/shared/config';
    import { useSidebarStore, useThemeStore } from '@/shared/model';
    import { useUserStore } from '@/entities/user';
    import { Dropdown } from '@/shared/ui';

    const { t, locale } = useI18n();
    const themeStore = useThemeStore();
    const sidebarStore = useSidebarStore();
    const userStore = useUserStore();

    const open = ref(false);

    const setLang = (lang: string) => {
        locale.value = lang;
        localStorage.setItem('rento_lang', JSON.stringify(lang));
        open.value = false;
    };
</script>

<template>
    <nav class="py-5 fixed top-0 w-full backdrop-blur-md bg-background/30 z-20">
        <div class="max-w-425 m-auto flex items-center flex-between px-5 md:px-10">
            <h3 class="text-3xl md:text-4xl font-semibold">
                <RouterLink to="/">Rento</RouterLink>
            </h3>

            <ul class="hidden md:flex divide-x divide-main-border">
                <li class="text-lg px-6 font-semibold transition hover:text-primary">
                    <RouterLink to="/about-us">{{ t('app.about_us') }}</RouterLink>
                </li>
                <li class="text-lg px-6 font-semibold transition hover:text-primary">
                    <RouterLink to="/cars">{{ t('app.cars') }}</RouterLink>
                </li>
                <li class="text-lg px-6 font-semibold transition hover:text-primary">
                    <RouterLink to="/contact">{{ t('app.contact') }}</RouterLink>
                </li>
            </ul>

            <div class="flex items-center gap-5">
                <Dropdown :is-open="open" @close="open = false" class="hidden md:block">
                    <Button
                        size="sm"
                        color="transparent"
                        @click="open = !open"
                        class="cursor-pointer hover:bg-main-hover-bg rounded-md px-2 py-1 transition"
                    >
                        <div class="flex gap-1 text-xl flex-center">
                            {{ locale }}
                            <Icon class="text-2xl" icon="iconamoon:arrow-down-2-light" />
                        </div>
                    </Button>

                    <template #actions>
                        <button
                            v-for="lang in languages"
                            :key="lang"
                            @click="setLang(lang)"
                            class="bg-main-bg uppercase py-2 w-full rounded-md cursor-pointer hover:bg-main-hover-bg transition"
                            :class="lang === locale && 'bg-main-hover-bg'"
                        >
                            {{ lang }}
                        </button>
                    </template>
                </Dropdown>

                <button @click="themeStore.toggleTheme" class="hidden md:block cursor-pointer">
                    <Icon v-if="themeStore.isDark" icon="fontisto:day-sunny" class="text-2xl" />
                    <Icon
                        v-else
                        icon="material-symbols-light:partly-cloudy-night-outline"
                        class="text-3xl"
                    />
                </button>

                <RouterLink
                    v-if="userStore.isAuthenticated"
                    to="/profile/account"
                    class="hidden md:block"
                >
                    <Icon icon="ix:user-profile-filled" class="text-3xl text-main-gray" />
                </RouterLink>

                <RouterLink to="/cars">
                    <Button size="sm" class="hidden lg:block">
                        {{ t('app.book_btn') }}
                    </Button>
                </RouterLink>
            </div>

            <div class="flex items-center gap-4 md:hidden">
                <RouterLink v-if="userStore.isAuthenticated" to="/profile/account">
                    <Icon icon="ix:user-profile-filled" class="text-3xl text-main-gray" />
                </RouterLink>
                <button @click="sidebarStore.setSidebarOpen(!sidebarStore.isOpen)">
                    <Icon class="text-3xl" icon="mdi:menu" />
                </button>
            </div>
        </div>
    </nav>
</template>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.15s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
