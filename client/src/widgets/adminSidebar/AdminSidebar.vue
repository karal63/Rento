<script setup lang="ts">
    import { hasPermission, useUserStore } from '@/entities/user';
    import { useClickOutside } from '@/shared/lib';
    import { useSidebarStore, useThemeStore } from '@/shared/model';
    import { Icon } from '@iconify/vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';
    import { adminLinks } from './sidebarLinks';

    const route = useRoute();
    const sidebarStore = useSidebarStore();
    const themeStore = useThemeStore();
    const userStore = useUserStore();
    const { t } = useI18n();

    const isMobile = ref(true);
    const isMenuOpen = ref(false);
    const isThemeMenuOpen = ref(false);
    const menuRef = ref<HTMLElement | null>(null);

    useClickOutside(menuRef, () => handleMenu(), isMenuOpen);

    const checkScreen = () => {
        isMobile.value = window.innerWidth < 768; // Tailwind md breakpoint
    };

    const setTheme = (isDarkTheme: boolean) => {
        themeStore.setTheme(isDarkTheme);
    };

    const handleMenu = () => {
        if (isMenuOpen.value) {
            isMenuOpen.value = false;
            isThemeMenuOpen.value = false;
        } else {
            isMenuOpen.value = true;
        }
    };

    const closeSidebar = () => {
        sidebarStore.isAdminOpen = false;
        isMenuOpen.value = false;
        isThemeMenuOpen.value = false;
    };

    onMounted(() => {
        checkScreen();
        window.addEventListener('resize', checkScreen);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', checkScreen);
    });
</script>

<template>
    <div
        v-if="sidebarStore.isAdminOpen && isMobile"
        @click="closeSidebar"
        class="fixed w-full h-full left-0 top-0 bg-black/20 z-10"
    ></div>

    <nav
        class="fixed top-0 left-0 bg-sidebar text-sidebar-foreground border-r border-border h-full w-60 py-5 z-20 transform transition"
        :class="sidebarStore.isAdminOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'"
    >
        <h1 class="text-2xl font-semibold text-center pt-4 pb-6 border-b border-main-border mx-5">
            Rento
            <span class="text-primary">| {{ route.meta.title }}</span>
        </h1>

        <ul class="mt-4 px-5">
            <li v-for="link in adminLinks" :key="link.path">
                <RouterLink
                    v-if="hasPermission(link.requiredAction)"
                    :to="link.path"
                    class="border px-2 py-2 rounded-md flex items-center gap-2 cursor-pointer"
                    :class="
                        route.fullPath.includes(link.path)
                            ? 'bg-secondary border-border shadow shadow-border'
                            : 'border-transparent'
                    "
                >
                    <div
                        class="w-8 h-8 rounded-md flex-center"
                        :class="
                            route.fullPath.includes(link.path)
                                ? 'bg-primary text-white'
                                : 'bg-main-gray-bg shadow shadow-main-border'
                        "
                    >
                        <Icon :icon="link.icon" class="text-xl" />
                    </div>
                    <span class="font-semibold text-sm">{{ t(`app.link.${link.name}`) }}</span>
                </RouterLink>
            </li>
        </ul>

        <div class="absolute bottom-0 mb-10 w-full flex-center">
            <div ref="menuRef" class="w-full mx-5 relative">
                <Transition name="menu">
                    <ul
                        v-if="isThemeMenuOpen"
                        class="bg-main-gray-bg rounded-md mb-3 border border-main-border"
                    >
                        <li
                            @click="setTheme(false)"
                            class="px-5 py-2 flex-between items-center gap-2 hover:bg-main-lightgray transition rounded-md cursor-pointer"
                        >
                            {{ t('app.admin_page.light') }}
                            <Icon v-if="!themeStore.isDark" icon="proicons:checkmark" />
                        </li>
                        <li
                            @click="setTheme(true)"
                            class="px-5 py-2 flex-between items-center hover:bg-main-lightgray transition rounded-md cursor-pointer"
                        >
                            {{ t('app.admin_page.dark') }}

                            <Icon v-if="themeStore.isDark" icon="proicons:checkmark" />
                        </li>
                    </ul>
                </Transition>

                <Transition name="menu">
                    <ul
                        v-if="isMenuOpen"
                        class="bg-main-gray-bg rounded-md mb-3 border border-main-border"
                    >
                        <li>
                            <RouterLink
                                to="/profile/account"
                                class="px-5 py-2 flex items-center gap-2 hover:bg-main-lightgray transition rounded-md cursor-pointer"
                            >
                                <Icon icon="mdi-light:account" class="text-lg" />
                                {{ t('app.admin_page.profile') }}
                            </RouterLink>
                        </li>
                        <li
                            @click="isThemeMenuOpen = !isThemeMenuOpen"
                            class="px-5 py-2 flex-between hover:bg-main-lightgray transition rounded-md cursor-pointer"
                        >
                            <div class="flex items-center gap-2">
                                <Icon icon="fontisto:day-sunny" class="text-lg" />
                                {{ t('app.admin_page.switch_theme') }}
                            </div>
                            <Icon icon="weui:arrow-filled" class="text-lg" />
                        </li>
                    </ul>
                </Transition>

                <button
                    @click="handleMenu"
                    class="bg-secondary border border-border text-secondary-foreground px-4 py-3 rounded-md w-full flex-between cursor-pointer"
                >
                    {{ userStore.user?.name }}
                    <Icon icon="pepicons-pencil:dots-y" />
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .menu-enter-active {
        transition: all 0.25s ease;
    }

    .menu-enter-from,
    .menu-leave-to {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
</style>
