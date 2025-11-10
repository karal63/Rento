<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { Button } from '../../shared/ui/button';
    import { languages } from '@/shared/config';

    const { t, locale } = useI18n();

    const open = ref(false);
    const isDarkTheme = ref(false);

    const toggleTheme = () => {
        isDarkTheme.value = !isDarkTheme.value;
        document.documentElement.classList.toggle('dark', isDarkTheme.value);
    };
</script>

<template>
    <nav class="my-5">
        <div class="max-w-[1900px] m-auto flex items-center flex-between">
            <h3 class="text-3xl">{{ t('app.name') }}</h3>

            <div class="flex items-center gap-3">
                <Button @click="toggleTheme" color="transparent">
                    <Icon v-if="isDarkTheme" icon="fontisto:day-sunny" class="text-2xl" />
                    <Icon
                        v-else
                        icon="material-symbols-light:partly-cloudy-night-outline"
                        class="text-2xl"
                    />
                </Button>

                <div class="relative inline-block text-left">
                    <Button color="transparent" @click="open = !open">
                        <div class="flex gap-2">
                            EN
                            <Icon class="text-xl" icon="iconamoon:arrow-down-2-light" />
                        </div>
                    </Button>

                    <transition name="fade">
                        <div
                            v-if="open"
                            class="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-lg shadow-lg ring-1 ring-main-border ring-opacity-5"
                        >
                            <div class="">
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
                        </div>
                    </transition>
                </div>

                <Button @click="console.log('log')">LOG IN</Button>
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
