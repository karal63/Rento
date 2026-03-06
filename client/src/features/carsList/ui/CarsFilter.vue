<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { Icon } from '@iconify/vue';
    import { CheckboxSelect, Input } from '@/shared/ui';
    import { Card, CardContent, CardHeader } from '@/shared/shadcn/ui/card';

    const { t } = useI18n();

    const searchInput = defineModel<string>({ required: true });

    const emit = defineEmits<{
        (e: 'addBrand', brand: string): void;
        (e: 'removeBrand', brand: string): void;
    }>();

    defineProps<{
        selectedBrands: string[];
        allBrands: string[];
    }>();
</script>

<template>
    <Card
        class="mb-8 xl:mb-0 xl:w-[20%] xl:sticky xl:top-24 border rounded-md border-main-border max-h-max"
    >
        <CardHeader>
            <h1 class="text-3xl font-semibold">{{ t('app.filters') }}</h1>
        </CardHeader>

        <CardContent>
            <h2 class="text-main-gray mb-1">{{ t('app.search') }}</h2>
            <Input
                v-model="searchInput"
                :placeholder="t('app.search') + '...'"
                size="medium"
                class="w-full"
            />

            <div>
                <h2 class="text-main-gray mt-6 mb-1">{{ t('app.brand') }}</h2>
                <CheckboxSelect
                    @add="emit('addBrand', $event)"
                    @remove="emit('removeBrand', $event)"
                    :items="allBrands"
                    :selectedCount="selectedBrands.length"
                />

                <ul class="mt-2 flex-col gap-2">
                    <li
                        v-for="brand in selectedBrands"
                        :key="brand"
                        class="bg-main-border px-2 py-1 rounded-md max-w-max flex-center"
                    >
                        <span>{{ brand }}</span>
                        <button @click="emit('removeBrand', brand)">
                            <Icon icon="mdi:close" class="w-4 h-4 ml-2 cursor-pointer" />
                        </button>
                    </li>
                </ul>
            </div>
        </CardContent>
    </Card>
</template>
