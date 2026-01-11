<script setup lang="ts">
    import { Button, Dropdown, Input } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

    const isStatusDropdownOpen = ref(false);
    const selectedStatus = ref('');

    const statuses = [
        {
            label: 'all',
            callback: () => (selectedStatus.value = 'all'),
        },
        {
            label: 'completed',
            callback: () => (selectedStatus.value = 'completed'),
        },
        {
            label: 'cancelled',
            callback: () => (selectedStatus.value = 'cancelled'),
        },
        {
            label: 'active',
            callback: () => (selectedStatus.value = 'active'),
        },
    ];
</script>

<template>
    <section class="mt-5">
        <hr class="text-main-border" />

        <div class="mt-5 flex gap-5">
            <Input
                type="search"
                size="medium"
                placeholder="Search"
                icon="icon-park-outline:search"
            />

            <Dropdown
                :isOpen="isStatusDropdownOpen"
                @setStatus="selectedStatus = $event"
                :items="statuses"
                @close="isStatusDropdownOpen = false"
            >
                <Button
                    @click="isStatusDropdownOpen = !isStatusDropdownOpen"
                    size="sm"
                    color="transparent"
                    :disableUppercase="true"
                    class="h-full border border-main-border flex-between gap-2 w-36"
                >
                    {{ selectedStatus ? selectedStatus : 'Status' }}
                    <Icon
                        icon="weui:arrow-filled"
                        class="transform rotate-90 text-xl text-main-gray"
                    />
                </Button>
            </Dropdown>
        </div>
    </section>
</template>
