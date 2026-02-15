<script setup lang="ts">
    import { Button, Input, Message, ModalTransition } from '@/shared/ui';
    import { useEditAccountStore } from '../model/editAccountStore';
    import { useI18n } from 'vue-i18n';
    import { Icon } from '@iconify/vue';
    import { useUserStore } from '@/entities/user';
    import { ref, watch } from 'vue';
    import useVuelidate from '@vuelidate/core';
    import { required, email, minLength } from '@vuelidate/validators';

    const editAccountStore = useEditAccountStore();
    const { t } = useI18n();
    const userStore = useUserStore();

    const rules = {
        email: { required, email },
        phoneNumber: { required, length: minLength(12) },
        secondName: { required, length: minLength(3) },
    };

    const emailInput = ref('');
    const phoneNumberInput = ref('');
    const secondNameInput = ref('');

    const v$ = useVuelidate(rules, {
        email: emailInput,
        phoneNumber: phoneNumberInput,
        secondName: secondNameInput,
    });

    const handleSubmit = async () => {
        const isValid = await v$.value.$validate();
        if (!isValid) return;

        await editAccountStore.edit(
            emailInput.value,
            phoneNumberInput.value,
            secondNameInput.value
        );
    };

    watch(
        () => userStore.user,
        () => {
            if (!userStore.user) return;
            emailInput.value = userStore.user.email ?? '';
            phoneNumberInput.value = userStore.user.phoneNumber ?? '';
            secondNameInput.value = userStore.user.secondName ?? '';
        },
        { immediate: true }
    );
</script>

<template>
    <ModalTransition :isOpen="editAccountStore.isOpen" @cancel="editAccountStore.close">
        <div class="relative bg-main-bg border border-main-border p-8 rounded-md w-sm md:w-xl">
            <h1 class="text-center text-xl md:text-2xl font-semibold mb-2">
                {{ t('app.account_page.edit_account') }}
            </h1>

            <form @submit.prevent="handleSubmit" class="flex-col gap-3">
                <label>
                    <span class="text-main-gray text-sm mb-1">
                        {{ t('app.account_page.email_addres') }}
                    </span>
                    <div>
                        <p v-for="e in v$.email.$errors" :key="e.$uid" class="text-red-500 text-sm">
                            {{ e.$message }}
                        </p>
                    </div>
                    <Input
                        v-model="emailInput"
                        size="medium"
                        :isError="v$.email.$errors.length >= 1"
                        class="w-full"
                    />
                </label>

                <label>
                    <span class="text-main-gray text-sm mb-1">
                        {{ t('app.account_page.phone_number') }}
                    </span>
                    <div>
                        <p
                            v-for="e in v$.phoneNumber.$errors"
                            :key="e.$uid"
                            class="text-red-500 text-sm"
                        >
                            {{ e.$message }}
                        </p>
                    </div>

                    <Input
                        v-model="phoneNumberInput"
                        size="medium"
                        :isError="v$.phoneNumber.$errors.length >= 1"
                        class="w-full"
                    />
                </label>

                <label>
                    <span class="text-main-gray text-sm mb-1">
                        {{ t('app.account_page.second_name') }}
                    </span>
                    <div>
                        <p
                            v-for="e in v$.secondName.$errors"
                            :key="e.$uid"
                            class="text-red-500 text-sm"
                        >
                            {{ e.$message }}
                        </p>
                    </div>
                    <Input
                        v-model="secondNameInput"
                        size="medium"
                        :isError="v$.secondName.$errors.length >= 1"
                        class="w-full"
                    />
                </label>

                <Message
                    v-if="editAccountStore.error"
                    type="error"
                    :message="editAccountStore.error"
                />

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
