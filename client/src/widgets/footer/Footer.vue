<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { RouterLink } from 'vue-router';

    const { t } = useI18n();
</script>

<template>
    <footer class="bg-main-bg mt-12">
        <div class="max-w-[1700px] m-auto px-6 py-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <!-- Logo + description -->
                <div>
                    <h2 class="text-2xl font-semibold mb-4">Rento</h2>
                    <p class="text-lg w-[90%] leading-relaxed">
                        {{ t('app.footer.app_desc') }}
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">{{ t('app.footer.quick_links') }}</h3>
                    <ul class="space-y-2 text-lg">
                        <li>
                            <RouterLink to="/">{{ t('app.footer.home') }}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/cars">{{ t('app.footer.cars') }}</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/contact">{{ t('app.footer.contact') }}</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Support -->
                <!-- <div>
                    <h3 class="text-lg font-semibold mb-4">Support</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="">FAQ</a></li>
                        <li><a href="#" class="">Terms & Conditions</a></li>
                        <li><a href="#" class="">Privacy Policy</a></li>
                        <li><a href="#" class="">Customer Service</a></li>
                    </ul>
                </div> -->

                <!-- Contact -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">{{ t('app.footer.contact') }}</h3>
                    <ul class="space-y-2 text-lg">
                        <li>📍 123 Main Street, City</li>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>✉️ support@rento.com</li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-main-border mt-10 pt-6 text-sm text-center">
                © {{ new Date().getFullYear() }} Rento. All rights reserved.
            </div>
        </div>
    </footer>
</template>
