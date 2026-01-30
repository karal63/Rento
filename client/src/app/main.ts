import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/router';
import { i18n } from '@/shared/config';
import { createPinia } from 'pinia';
import { hasPermission, useUserStore } from '@/entities/user';
import { refreshTokens } from '@/features/auth/refresh';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { queryClient } from '@/shared/config/queryClient';

const bootstrap = async () => {
    const app = createApp(App);
    const pinia = createPinia();
    const userStore = useUserStore(pinia);

    await refreshTokens();

    router.beforeEach(to => {
        if (
            (to.meta.requiresAuth && !userStore.isAuthenticated) ||
            (to.meta.requiresPermission && !hasPermission('view:protected-page'))
        ) {
            return '/';
        }
    });

    app.use(router);
    app.use(i18n);
    app.use(pinia);

    app.use(VueQueryPlugin, { queryClient });

    app.mount('#app');
};

bootstrap();
