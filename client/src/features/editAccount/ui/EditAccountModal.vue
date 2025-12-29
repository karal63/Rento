<script setup lang="ts">
    import { Button, Input, ModalTransition } from '@/shared/ui';
    import { useEditAccountStore } from '../model/editAccountStore';
    import { useI18n } from 'vue-i18n';
    import { Icon } from '@iconify/vue';
    import { useUserStore } from '@/entities/user';
    import { ref, watch } from 'vue';

    const editAccountStore = useEditAccountStore();
    const { t } = useI18n();
    const userStore = useUserStore();

    const email = ref('');
    const phoneNumber = ref('');
    const secondName = ref('');

    watch(
        () => userStore.user,
        () => {
            if (!userStore.user) return;
            email.value = userStore.user.email ?? '';
            phoneNumber.value = userStore.user.phoneNumber ?? '';
            secondName.value = userStore.user.secondName ?? '';
        },
        { immediate: true }
    );
</script>

<template>
    <ModalTransition :isOpen="editAccountStore.isOpen" @cancel="editAccountStore.close">
        <div class="relative bg-main-bg border border-main-border p-8 rounded-md w-sm md:w-xl">
            <h1 class="text-center text-xl md:text-2xl font-semibold mb-2">Edit account</h1>

            <form
                @submit.prevent="editAccountStore.edit(email, phoneNumber, secondName)"
                class="flex-col gap-3"
            >
                <label>
                    <span class="text-main-gray text-sm mb-1">Email adres</span>
                    <Input v-model="email" size="medium" class="w-full" />
                </label>

                <label>
                    <span class="text-main-gray text-sm mb-1">Phone number</span>
                    <Input v-model="phoneNumber" size="medium" class="w-full" />
                </label>

                <label>
                    <span class="text-main-gray text-sm mb-1">Second name</span>
                    <Input v-model="secondName" size="medium" class="w-full" />
                </label>

                <Button type="submit" size="sm" class="w-full mt-5">{{ t('app.edit') }}</Button>
            </form>

            <button
                @click="editAccountStore.close"
                class="absolute right-3 top-3 cursor-pointer hover:bg-main-hover-bg p-1 rounded-md"
            >
                <Icon icon="material-symbols-light:close" class="text-xl" />
            </button>
        </div>
    </ModalTransition>
</template>
