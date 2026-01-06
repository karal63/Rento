<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { Button } from '../../shared/ui/button';
    import { languages } from '@/shared/config';
    import { useSidebarStore, useThemeStore } from '@/shared/model';
    import { useUserStore } from '@/entities/user';

    const { t, locale } = useI18n();
    const themeStore = useThemeStore();
    const sidebarStore = useSidebarStore();
    const userStore = useUserStore();

    const open = ref(false);
</script>

<template>
    <nav class="py-5 fixed top-0 w-full backdrop-blur-md bg-main-bg/30 z-20">
        <div class="max-w-[1700px] m-auto flex items-center flex-between px-5 lg:px-10">
            <h3 class="text-3xl md:text-4xl font-semibold">
                <RouterLink to="/">Rento</RouterLink>
            </h3>

            <ul class="hidden md:flex divide-x divide-main-border">
                <li class="text-lg px-6 font-semibold transition hover:text-primary">
                    <RouterLink to="/about">{{ t('app.about_us') }}</RouterLink>
                </li>
                <li class="text-lg px-6 font-semibold transition hover:text-primary">
                    <RouterLink to="/cars">{{ t('app.cars') }}</RouterLink>
                </li>
                <li class="text-lg px-6 font-semibold transition hover:text-primary">
                    <RouterLink to="/contact">{{ t('app.contact') }}</RouterLink>
                </li>
            </ul>

            <div class="flex items-center gap-5">
                <div class="relative hidden lg:inline-block text-left">
                    <button
                        @click="open = !open"
                        class="cursor-pointer hover:bg-main-hover-bg rounded-md px-2 py-1 transition"
                    >
                        <div class="flex gap-1 text-xl flex-center">
                            {{ locale }}
                            <Icon class="text-2xl" icon="iconamoon:arrow-down-2-light" />
                        </div>
                    </button>

                    <transition name="fade">
                        <div
                            v-if="open"
                            class="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-lg bg-main-bg shadow-lg ring-1 ring-main-border ring-opacity-5"
                        >
                            <button
                                v-for="lang in languages"
                                :key="lang"
                                @click="locale = lang"
                                class="block py-2 w-full rounded-md cursor-pointer hover:bg-main-hover-bg transition"
                                :class="lang === locale && 'bg-main-hover-bg'"
                            >
                                {{ lang }}
                            </button>
                        </div>
                    </transition>
                </div>

                <button @click="themeStore.toggleTheme" class="hidden lg:block cursor-pointer">
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
                    <Button size="sm" class="hidden md:block">
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
