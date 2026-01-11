<script setup lang="ts" generic="T">
    import { ref } from 'vue';
    import type { TableColumn } from '../model/types';
    import Dropdown from '../../dropdown/Dropdown.vue';
    import { Icon } from '@iconify/vue';

    defineProps<{
        columns: TableColumn<T>[];
        row: T;
    }>();

    const isOpen = ref(false);
</script>

<template>
    <td v-for="col in columns" :key="col.key" class="px-3 py-4">
        <slot :name="`cell-${col.key}`" :row="row">
            {{ col.render ? col.render(row) : (row as any)[col.key] }}
        </slot>
    </td>

    <td>
        <div class="flex-center">
            <Dropdown v-if="$slots.actions" @close="isOpen = false" :is-open="isOpen" side="left">
                <button @click="isOpen = !isOpen" class="text-xl cursor-pointer">
                    <Icon icon="pepicons-pencil:dots-y" />
                </button>

                <template #actions="slotProps">
                    <slot name="actions" v-bind="slotProps" />
                </template>
            </Dropdown>
        </div>
    </td>
</template>
