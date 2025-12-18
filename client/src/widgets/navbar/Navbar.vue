<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { Button } from '../../shared/ui/button';
    import { languages } from '@/shared/config';
    import { useSidebarStore, useThemeStore } from '@/shared/model';

    const { t, locale } = useI18n();
    const themeStore = useThemeStore();
    const sidebarStore = useSidebarStore();

    const open = ref(false);
    const isDarkTheme = ref(false);

    const toggleTheme = () => {
        isDarkTheme.value = !isDarkTheme.value;
        themeStore.setTheme(isDarkTheme.value);
        document.documentElement.classList.toggle('dark', isDarkTheme.value);
    };
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

            <div class="flex items-center gap-3">
                <Button @click="toggleTheme" color="transparent" size="sm" class="hidden lg:block">
                    <Icon v-if="isDarkTheme" icon="fontisto:day-sunny" class="text-2xl" />
                    <Icon
                        v-else
                        icon="material-symbols-light:partly-cloudy-night-outline"
                        class="text-2xl"
                    />
                </Button>

                <div class="relative hidden lg:inline-block text-left">
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

                <!-- <button>
                    <Icon icon="ic:round-account-circle" class="text-3xl" />
                </button> -->

                <Button @click="console.log('log')" size="sm" class="hidden md:block">
                    {{ t('app.book_btn') }}
                </Button>
            </div>

            <button
                @click="sidebarStore.setSidebarOpen(!sidebarStore.isOpen)"
                class="block md:hidden cursor-pointer"
            >
                <Icon class="text-3xl" icon="mdi:menu" />
            </button>
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
