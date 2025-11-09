<script setup lang="ts">
    import { useI18n } from 'vue-i18n';

    const { t, locale } = useI18n();
</script>

<template>
    <v-app-bar flat app color="customWhite">
        <div class="w-full max-w-[1800px] m-auto flex items-center px-4">
            <!-- Left side -->
            <v-toolbar-title>
                <span class="text-2xl font-semibold">{{ t('app.name') }}</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- pushes button to the right -->

            <!-- Right side -->
            <v-btn @click="locale = 'pl'" variant="flat" color="#5865f2">Log in</v-btn>
        </div>
    </v-app-bar>
</template>
