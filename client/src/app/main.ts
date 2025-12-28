import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/router';
import { i18n } from '@/shared/config';
import { createPinia } from 'pinia';
import { useUserStore } from '@/entities/user';
import { refreshTokens } from '@/features/auth/refresh';

const bootstrap = async () => {
    const app = createApp(App);
    const pinia = createPinia();
    const userStore = useUserStore(pinia);

    app.use(router);
    app.use(i18n);
    app.use(pinia);

    await refreshTokens();

    router.beforeEach(to => {
        if (to.meta.requiresAuth && !userStore.isAuthenticated) return '/';
    });

    app.mount('#app');
};

bootstrap();
