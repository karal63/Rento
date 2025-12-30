<script setup lang="ts">
    import type { Breadcrumb } from '@/shared/ui';
    import { AdminNavbar, AdminSidebar } from '@/widgets';
    import { ref } from 'vue';

    const breadcrumbs = ref<Breadcrumb[]>([]);
</script>

<template>
    <div class="p-5">
        <AdminSidebar />

        <div class="ml-64">
            <AdminNavbar :breadcrumps="breadcrumbs" />
            <RouterView @setBreadcrumbs="breadcrumbs = $event" />
        </div>
    </div>
</template>
