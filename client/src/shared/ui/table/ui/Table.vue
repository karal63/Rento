<script setup lang="ts" generic="T">
    import type { TableColumn } from '../model/types';
    import Record from './Record.vue';

    defineProps<{
        rows: T[];
        columns: TableColumn<T>[];
        loading?: boolean;
    }>();
</script>

<template>
    <table class="w-full">
        <thead>
            <tr>
                <td
                    v-for="(col, i) in columns"
                    :key="col.key"
                    :style="{ width: col.width }"
                    class="bg-main-gray-bg px-3 py-3 text-left text-sm font-semibold text-main-gray"
                    :class="i === 0 ? 'rounded-tl-md rounded-bl-md' : 'border-l border-main-border'"
                >
                    {{ col.header }}
                </td>

                <td class="w-[5%] bg-main-gray-bg rounded-tr-md rounded-br-md"></td>
            </tr>
        </thead>
        <tbody>
            <!-- skeleton -->
            <tr v-if="loading">
                <td :colspan="columns.length + 1">
                    <table v-for="(_, i) in 6" :key="i" class="w-full">
                        <tbody>
                            <tr>
                                <td
                                    v-for="col in columns"
                                    :key="col.key"
                                    :style="{ width: col.width }"
                                    class="px-3 py-3"
                                >
                                    <div class="bg-main-gray-bg h-10 skeleton"></div>
                                </td>

                                <td class="w-[5%]"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            <tr
                v-else
                v-for="row in rows"
                :key="(row as any)._id"
                class="border-b border-main-border text-sm"
            >
                <Record :columns="columns" :row="row">
                    <template v-for="(_, name) in $slots" #[name]="slotProps">
                        <slot :name="name" v-bind="slotProps" />
                    </template>
                </Record>
            </tr>
        </tbody>
    </table>
</template>
