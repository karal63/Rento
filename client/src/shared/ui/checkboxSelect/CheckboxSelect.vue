<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import CheckboxItem from './CheckboxItem.vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const isDropdownOpen = ref(false);

    defineProps<{
        items: string[];
        selectedCount: number;
    }>();

    defineEmits<{
        (e: 'addBrand', brand: string): void;
    }>();
</script>

<template>
    <div class="relative">
        <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="border border-main-border rounded-md w-full py-2 text-lg flex-between px-4 cursor-pointer"
        >
            <span>
                {{
                    selectedCount ? `${t('app.selected')} (${selectedCount})` : t('app.all_brands')
                }}
            </span>
            <Icon :icon="isDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-2xl" />
        </button>

        <div
            v-show="isDropdownOpen"
            class="absolute top-[110%] left-0 border border-main-border bg-main-bg shadow-sm shadow-main-border rounded-md w-full"
        >
            <CheckboxItem
                v-for="item in items"
                :key="item"
                @addBrand="$emit('addBrand', $event)"
                :item="item"
            />
        </div>
    </div>
</template>
