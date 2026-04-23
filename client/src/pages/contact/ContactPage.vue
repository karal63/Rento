<script setup lang="ts">
    import { ContactForm } from '@/features/contact';
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();
</script>

<template>
    <main class="max-w-425 m-auto 0 px-5 mt-24 sm:mt-32">
        <h1 class="text-3xl font-bold mb-4">{{ t('app.contact_form.page_title') }}</h1>
        <p class="mb-6">
            {{ t('app.contact_form.page_desc') }}
        </p>

        <ContactForm />
    </main>
</template>
