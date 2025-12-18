<script setup lang="ts">
    import { useSidebarStore, useThemeStore } from '@/shared/model';
    import { useI18n } from 'vue-i18n';
    import { languages } from '@/shared/config';
    import { ref } from 'vue';
    import { Button } from '@/shared/ui/button';
    import { Icon } from '@iconify/vue';
    import { logout } from '@/features/auth/logout';
    import { useUserStore } from '@/entities/user';

    const { t, locale } = useI18n();
    const sidebarStore = useSidebarStore();
    const themeStore = useThemeStore();
    const userStore = useUserStore();

    const open = ref(false);
    const isDarkTheme = ref(false);

    const toggleTheme = () => {
        isDarkTheme.value = !isDarkTheme.value;
        themeStore.setTheme(isDarkTheme.value);
        document.documentElement.classList.toggle('dark', isDarkTheme.value);
    };

    const handleLogout = async () => {
        await logout();
        sidebarStore.setSidebarOpen(false);
    };
</script>

<template>
    <aside
        class="w-full sm:w-64 h-full bg-main-bg border-r border-main-border fixed top-0 left-0 pt-36 shadow shadow-main-border transition"
        :class="sidebarStore.isOpen ? 'translate-x-0' : '-translate-x-full '"
    >
        <nav>
            <ul>
                <li>
                    <RouterLink
                        to="/about"
                        @click="sidebarStore.setSidebarOpen(false)"
                        class="text-xl transition font-semibold block hover:bg-main-hover-bg w-full py-3 px-5"
                    >
                        {{ t('app.about_us') }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/cars"
                        @click="sidebarStore.setSidebarOpen(false)"
                        class="text-xl transition font-semibold block hover:bg-main-hover-bg w-full py-3 px-5"
                    >
                        {{ t('app.cars') }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/contact"
                        @click="sidebarStore.setSidebarOpen(false)"
                        class="text-xl transition font-semibold block hover:bg-main-hover-bg w-full py-3 px-5"
                    >
                        {{ t('app.contact') }}
                    </RouterLink>
                </li>
            </ul>

            <div class="mt-10">
                <div class="flex items-center">
                    <Button @click="toggleTheme" color="transparent" size="sm">
                        <Icon v-if="isDarkTheme" icon="fontisto:day-sunny" class="text-2xl" />
                        <Icon
                            v-else
                            icon="material-symbols-light:partly-cloudy-night-outline"
                            class="text-2xl"
                        />
                    </Button>
                    <div class="relative inline-block text-left">
                        <Button @click="open = !open" color="transparent" size="sm">
                            <div class="flex gap-2">
                                {{ locale }}
                                <Icon class="text-xl" icon="iconamoon:arrow-down-2-light" />
                            </div>
                        </Button>

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

                    <Button v-if="userStore.isAuthenticated" size="sm" @click="handleLogout">
                        LOG OUT
                    </Button>
                </div>
            </div>
        </nav>
    </aside>
</template>
