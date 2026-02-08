<script setup lang="ts">
    import { USER_ROLE, type UserRole } from '@/entities/user';
    import { computed, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const props = defineProps<{
        role: UserRole;
    }>();

    watch(
        () => props.role,
        newRole => {
            console.log('Role changed:', newRole);
        },
        { immediate: true }
    );

    const getClasses = computed(() => {
        let baseClasses = 'px-3 py-1 rounded-md text-sm font-medium max-w-max transition-all';
        switch (props.role) {
            case USER_ROLE.Admin:
                return `${baseClasses} bg-red-400/20 text-red-600 hover:bg-red-400/30`;
            case USER_ROLE.Employee:
                return `${baseClasses} bg-blue-400/20 text-blue-600 hover:bg-blue-400/30`;
            case USER_ROLE.User:
                return `${baseClasses} bg-green-400/20 text-green-600 hover:bg-green-400/30`;
            default:
                return baseClasses;
        }
    });
</script>

<template>
    <div :class="getClasses">
        {{ t(`app.role.${role}`) }}
    </div>
</template>
