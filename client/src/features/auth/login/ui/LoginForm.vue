<script setup lang="ts">
    import Input from '@/shared/ui/input/Input.vue';
    import { computed } from 'vue';

    const props = defineProps<{
        loginUser: {
            email: string;
            password: string;
        };
        loading: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'update:loginUser', value: typeof props.loginUser): void;
    }>();

    const model = computed({
        get: () => props.loginUser,
        set: value => emit('update:loginUser', value),
    });
</script>

<template>
    <div class="flex-col gap-2">
        <Input
            v-model="model.email"
            type="email"
            size="medium"
            placeholder="Name"
            :disabled="loading"
            class="w-full"
        />
        <Input
            v-model="model.password"
            type="password"
            size="medium"
            placeholder="Password"
            :disabled="loading"
            class="w-full"
        />
    </div>
</template>
