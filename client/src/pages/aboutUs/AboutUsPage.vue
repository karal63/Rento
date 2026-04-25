<script setup lang="ts">
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <div class="max-w-425 m-auto 0 px-5 mt-24 sm:mt-32">
        <main>
            <h1 class="text-4xl font-bold mb-10">{{ $t('app.about_us_page.page_title') }}</h1>

            <div class="max-w-full lg:max-w-7xl">
                <p class="text-lg mb-6">
                    {{ t('app.about_us_page.page_desc1') }}
                </p>

                <p class="text-lg mb-6">
                    {{ t('app.about_us_page.page_desc2') }}
                </p>

                <p class="text-lg mb-6">
                    {{ t('app.about_us_page.page_desc3') }}
                </p>

                <p class="text-lg mb-4">{{ t('app.about_us_page.page_desc4') }}</p>
            </div>
        </main>

        <div>
            <img src="" alt="" />
        </div>

        <div class="mt-10">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2279.6245404667993!2d21.000194384966132!3d52.22940512901212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8df7462517%3A0xe0ed4f18966a8bf9!2sVarso!5e1!3m2!1sru!2spl!4v1777058437618!5m2!1sru!2spl"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full lg:w-2/3 xl:w-1/2 h-125"
            ></iframe>
        </div>
    </div>
</template>
