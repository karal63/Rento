<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { useUserStore } from '../model/user.store';
    import { useI18n } from 'vue-i18n';

    const userStore = useUserStore();
    const { t } = useI18n();

    defineEmits<{
        (e: 'edit'): void;
    }>();
</script>

<template>
    <div class="bg-main-gray-bg border border-main-border rounded-md px-5 py-7">
        <!-- summary header -->
        <div class="flex-between">
            <!-- general info -->
            <div>
                <h3 class="text-3xl font-semibold">{{ userStore.user?.name }}</h3>
            </div>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-3">
            <div>
                <span class="text-main-gray text-sm">{{ t('app.account_page.email_addres') }}</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.email ?? t('app.account_page.not_provided') }}</p>
                    <button @click="$emit('edit')">
                        <Icon
                            icon="iconoir:edit"
                            class="text-xl h-7 w-7 p-1 hover:bg-main-border rounded-md cursor-pointer text-main-gray"
                        />
                    </button>
                </div>
            </div>

            <div>
                <span class="text-main-gray text-sm">{{ t('app.account_page.phone_number') }}</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.phoneNumber ?? t('app.account_page.not_provided') }}</p>
                    <button @click="$emit('edit')">
                        <Icon
                            icon="iconoir:edit"
                            class="text-xl h-7 w-7 p-1 hover:bg-main-border rounded-md cursor-pointer text-main-gray"
                        />
                    </button>
                </div>
            </div>

            <div>
                <span class="text-main-gray text-sm">{{ t('app.account_page.second_name') }}</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.secondName ?? t('app.account_page.not_provided') }}</p>
                    <button @click="$emit('edit')">
                        <Icon
                            icon="iconoir:edit"
                            class="text-xl h-7 w-7 p-1 hover:bg-main-border rounded-md cursor-pointer text-main-gray"
                        />
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-7 grid grid-cols-2">
            <div>
                <span class="text-main-gray text-sm">{{ t('app.account_page.user_since') }}</span>
                <div class="flex items-center gap-2">
                    <p>
                        {{
                            userStore.user?.createdAt
                                ? new Date(userStore.user?.createdAt).toLocaleString()
                                : t('app.account_page.date_not_found')
                        }}
                    </p>
                </div>
            </div>

            <div>
                <span class="text-main-gray text-sm">{{ t('app.account_page.auth_method') }}</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.auth_provider }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
