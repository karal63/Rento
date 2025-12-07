<script setup lang="ts">
    import { Input, Button } from '@/shared/ui';
    import { ref } from 'vue';

    const email = ref('');
    const password = ref('');

    const isAuthLogin = ref(true);
</script>

<template>
    <form @submit.prevent>
        <h2 class="text-2xl mb-3">Login to continue</h2>
        <div class="flex-col gap-2">
            <div v-if="isAuthLogin" class="flex-col gap-2">
                <Input
                    v-model="email"
                    type="email"
                    size="medium"
                    placeholder="Name"
                    class="w-full"
                />
                <Input
                    v-model="password"
                    type="password"
                    size="medium"
                    placeholder="Password"
                    class="w-full"
                />
            </div>

            <div v-else class="flex-col gap-2">
                <Input size="medium" placeholder="Name" class="w-full" />
                <Input size="medium" placeholder="Second name" class="w-full" />
                <Input size="medium" placeholder="Email addres" class="w-full" />
                <Input size="medium" placeholder="Phone number" class="w-full" />
            </div>

            <div v-if="isAuthLogin" class="flex gap-2">
                <Button size="sm" class="max-w-max">Login</Button>
                <Button
                    @click="isAuthLogin = false"
                    size="sm"
                    color="transparent"
                    class="max-w-max border border-main-border"
                >
                    Create an account
                </Button>
            </div>

            <div v-else class="flex gap-2">
                <Button size="sm" class="max-w-max">RESERVE</Button>
                <Button
                    @click="isAuthLogin = true"
                    size="sm"
                    color="transparent"
                    class="max-w-max border border-main-border"
                >
                    i already have an account
                </Button>
            </div>
        </div>
    </form>
</template>
