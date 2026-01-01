<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { computed } from 'vue';

    type CardColor = 'blue' | 'theme';

    const props = withDefaults(
        defineProps<{
            color?: CardColor;
            icon: string;
            value?: number;
            text: string;
        }>(),
        {
            color: 'theme',
        }
    );

    const variant = computed(() => {
        switch (props.color) {
            case 'blue':
                return {
                    container: 'bg-primary',
                    icon: 'bg-white text-primary',
                    value: 'text-white',
                    text: 'text-main-gray-bg',
                };

            case 'theme':
            default:
                return {
                    container: 'bg-main-gray-bg',
                    icon: 'bg-pure-theme text-main-gray',
                    value: 'text-black',
                    text: 'text-main-gray',
                };
        }
    });
</script>

<template>
    <div class="rounded-md p-4" :class="variant.container">
        <div class="w-12 h-12 rounded-full flex-center" :class="variant.icon">
            <Icon :icon="icon" class="text-2xl" />
        </div>

        <h3 class="font-bold text-xl mt-2" :class="variant.value">
            {{ value ?? 'Invalid data' }}
        </h3>

        <p :class="variant.text">
            {{ text }}
        </p>
    </div>
</template>
