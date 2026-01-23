<script setup lang="ts">
    import { useClickOutside } from '@/shared/lib';
    import { computed, ref } from 'vue';

    type Item = {
        label: string;
        callback: () => void;
    };

    const props = defineProps<{
        isOpen: boolean;
        items?: Item[];
        side?: 'left' | 'center' | 'right';
    }>();

    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    const ok = ref(true);
    const dropdownRef = ref<HTMLElement | null>(null);
    useClickOutside(dropdownRef, () => emit('close'), ok);

    const handleClick = (item: Item) => {
        item.callback();
        emit('close');
    };

    const getClasses = computed(() => {
        if (props.side === 'left') {
            return 'right-0';
        } else if (props.side === 'center') {
            return 'left-0 w-full';
        } else if (props.side === 'right') {
            return 'left-full';
        }

        return 'left-0 w-full';
    });
</script>

<template>
    <div ref="dropdownRef" class="relative">
        <slot />

        <Transition name="dropdown">
            <div
                v-if="isOpen"
                class="absolute z-20 top-[110%] border border-main-border bg-main-gray-bg shadow rounded-md"
                :class="getClasses"
            >
                <ul v-if="!$slots.actions" class="divide-y divide-main-border">
                    <li v-for="item in items" :key="item.label">
                        <button
                            type="button"
                            @click="handleClick(item)"
                            class="w-full text-left py-2 px-3 text-sm cursor-pointer hover:bg-main-hover-bg transition capitalize"
                        >
                            {{ item.label }}
                        </button>
                    </li>
                </ul>

                <slot v-else name="actions" />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .dropdown-enter-active {
        transition: all 0.25s ease;
    }

    .dropdown-enter-from,
    .dropdown-leave-to {
        opacity: 0;
        transform: scale(0.9) translateY(-10px);
    }
</style>
