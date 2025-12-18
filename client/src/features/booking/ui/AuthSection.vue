<script setup lang="ts">
    import { useUserStore } from '@/entities/user';
    import { LoginForm } from '@/features/auth/login';
    import { SignupForm } from '@/features/auth/signup';
    import { baseURL } from '@/shared/config';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const userStore = useUserStore();
    const { params } = useRoute();

    const isLoginType = ref(true);

    onMounted(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', 'rento_cr_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-radius', '8');
        script.setAttribute('data-auth-url', `${baseURL}auth/telegram?car_id=${params.id}`);

        document.getElementById('telegram-login')?.appendChild(script);
    });
</script>

<template>
    <form @submit.prevent>
        <div v-if="!userStore.isAuthenticated" class="flex-col gap-2">
            <h2 class="text-2xl mb-3">Login to continue</h2>
            <LoginForm @setIsLoginType="isLoginType = $event" v-if="isLoginType" />
            <SignupForm @setIsLoginType="isLoginType = $event" v-else />

            <div>
                <p class="my-2 text-sm text-main-gray">———— or ————</p>
                <div id="telegram-login"></div>
            </div>
        </div>
    </form>
</template>
