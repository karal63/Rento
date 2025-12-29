<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { useUserStore } from '../model/user.store';

    const userStore = useUserStore();

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
                <span class="text-main-gray text-sm">Email adres</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.email ?? 'Not provided' }}</p>
                    <button @click="$emit('edit')">
                        <Icon
                            icon="iconoir:edit"
                            class="text-xl h-7 w-7 p-1 hover:bg-main-border rounded-md cursor-pointer text-main-gray"
                        />
                    </button>
                </div>
            </div>

            <div>
                <span class="text-main-gray text-sm">Phone number</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.phoneNumber ?? 'Not provided' }}</p>
                    <button @click="$emit('edit')">
                        <Icon
                            icon="iconoir:edit"
                            class="text-xl h-7 w-7 p-1 hover:bg-main-border rounded-md cursor-pointer text-main-gray"
                        />
                    </button>
                </div>
            </div>

            <div>
                <span class="text-main-gray text-sm">Second name</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.secondName ?? 'Not provided' }}</p>
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
                <span class="text-main-gray text-sm">User since</span>
                <div class="flex items-center gap-2">
                    <p>
                        {{
                            userStore.user
                                ? new Date(userStore.user?.createdAt).toLocaleString()
                                : 'Date not found'
                        }}
                    </p>
                </div>
            </div>

            <div>
                <span class="text-main-gray text-sm">Auth method</span>
                <div class="flex items-center gap-2">
                    <p>{{ userStore.user?.auth_provider ?? 'Not provided' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
