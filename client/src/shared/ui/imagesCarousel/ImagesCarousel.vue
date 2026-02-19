<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

    const props = defineProps<{
        images: string[];
    }>();

    const currentImage = ref(0);

    const showPreviousImage = () => {
        if (currentImage.value < 1) currentImage.value = props.images.length - 1;
        else {
            currentImage.value -= 1;
        }
    };

    const showNextImage = () => {
        if (currentImage.value === props.images.length - 1) currentImage.value = 0;
        else {
            currentImage.value += 1;
        }
    };
</script>

<template>
    <div class="relative">
        <img
            :src="props.images[currentImage]"
            alt="Selected car"
            class="w-full h-full object-cover rounded-xl shadow-md"
        />

        <button
            @click="showPreviousImage"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 rotate-180 w-10 h-10 flex-center bg-main-bg rounded-full cursor-pointer"
        >
            <Icon icon="weui:arrow-filled" class="text-2xl" />
        </button>

        <button
            @click="showNextImage"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 flex-center bg-main-bg rounded-full cursor-pointer"
        >
            <Icon icon="weui:arrow-filled" class="text-2xl" />
        </button>
    </div>
</template>
