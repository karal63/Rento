<script setup lang="ts">
    import AuthSection from './AuthSection.vue';
    import RentDetails from './RentDetails.vue';
</script>

<template>
    <section class="lg:w-2/3 flex-col gap-8">
        <RentDetails />
        <AuthSection />
    </section>
</template>

<style>
    :root {
        --dp-button-height: 100%;
        --dp-border-radius: 6px;

        --dp-input-padding: 8px 30px 8px 12px;
    }

    .dp__theme_light {
        --dp-background-color: #efefef;
        --dp-border-color-focus: hsl(220 90% 66%);
        --dp-border-color: #d5d5d5;
    }

    .dp__theme_dark {
        --dp-background-color: #141414;
        --dp-border-color-focus: hsl(220 90% 66%);
        --dp-border-color: #292929;
    }
</style>
