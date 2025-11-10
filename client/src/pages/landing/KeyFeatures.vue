<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { keyFeatures } from '@/shared/const';
</script>

<template>
    <section class="max-w-[1500px] m-auto my-52">
        <h1 class="text-6xl font-extrabold">Key Features</h1>

        <p class="text-2xl my-13">
            Discover the standout features that make our product reliable, efficient, and easy to
            use.
        </p>

        <div class="grid grid-cols-4 gap-10">
            <div
                v-for="feat in keyFeatures"
                :key="feat.id"
                class="border border-main-border rounded-xl p-8"
            >
                <div class="h-32">
                    <div
                        class="w-16 h-16 rounded-full flex-center"
                        :style="{
                            backgroundColor: feat.color,
                        }"
                    >
                        <Icon :icon="feat.icon" class="text-4xl" />
                    </div>
                </div>

                <div class="h-32 flex-col justify-end text-2xl font-bold">
                    <p class="w-2/3">{{ feat.text }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
