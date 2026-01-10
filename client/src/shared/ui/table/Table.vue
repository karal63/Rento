<script setup lang="ts" generic="T">
    import { Icon } from '@iconify/vue';
    import type { TableColumn } from './types';
    import { ref } from 'vue';

    defineProps<{
        rows: T[];
        columns: TableColumn<T>[];
        loading?: boolean;
    }>();

    const isOpen = ref(false);
</script>

<template>
    <table class="w-full">
        <thead>
            <tr>
                <td
                    v-for="col in columns"
                    :key="col.key"
                    :style="{ width: col.width }"
                    class="bg-main-gray-bg px-3 py-3 text-left text-sm font-semibold text-main-gray border-l border-main-border"
                >
                    {{ col.header }}
                </td>

                <td class="w-[5%] bg-main-gray-bg rounded-tr-md rounded-br-md"></td>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loading">
                <td :colspan="columns.length + 1">Loading...</td>
            </tr>

            <tr
                v-else
                v-for="row in rows"
                :key="(row as any)._id"
                class="border-b border-main-border text-sm"
            >
                <td v-for="col in columns" :key="col.key" class="px-3 py-4">
                    <!-- <slot :name="`cell-${col.key}`" :row="row"> -->
                    {{ col.render ? col.render(row) : (row as any)[col.key] }}
                    <!-- </slot> -->
                </td>

                <td>
                    <!-- <slot name="actions" :rental="row" /> -->

                    <div v-if="$slots.actions" class="flex-center">
                        <button class="text-xl cursor-pointer">
                            <Icon icon="pepicons-pencil:dots-y" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
