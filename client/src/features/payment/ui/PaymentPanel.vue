<script setup lang="ts">
    import {
        VueStripeElements,
        VueStripePaymentElement,
        VueStripeProvider,
        type Stripe,
        type StripeElements,
    } from '@vue-stripe/vue-stripe';
    import { Button } from '@/shared/ui';
    import { computed, onMounted, ref } from 'vue';
    import { apiCreatePaymentIntent } from '../api/payment.api';
    import { Icon } from '@iconify/vue';

    const publishableKey =
        'pk_test_51ScRd71aiYRGwgEigAXPwQNOXdaE1KmnXKsECMimAkOUOG3ARc4F62VaFUpySHCp5Z2pwaocyS0y6eCGOODeM3BE00SdO0aVU2';
    const clientSecret = ref('');
    const loading = ref(false);

    const stripeInstance = ref<Stripe | null>(null);
    const elementsInstance = ref<StripeElements | null>(null);

    const onStripeLoad = (stripe: Stripe) => {
        stripeInstance.value = stripe;
    };

    const onElementsReady = (elements: StripeElements) => {
        elementsInstance.value = elements;
    };

    const handleSubmit = async () => {
        if (!stripeInstance.value || !elementsInstance.value) return;

        loading.value = true;

        const { error } = await stripeInstance.value.confirmPayment({
            elements: elementsInstance.value,
            confirmParams: {
                return_url: `${window.location.origin}/cars`,
            },
        });

        if (error) {
            loading.value = false;
        }
    };

    onMounted(async () => {
        const res = await apiCreatePaymentIntent(1000);
        clientSecret.value = res.data.clientSecret;
    });

    const stripeOptions = computed(() => {
        return {
            appearance: {
                loader: 'never',
                theme: 'flat',
            },
        };
    });
</script>

<template>
    <VueStripeProvider :publishable-key="publishableKey" @load="onStripeLoad">
        <VueStripeElements
            v-if="clientSecret"
            :client-secret="clientSecret"
            :options="stripeOptions"
            @ready="onElementsReady"
        >
            <form @submit.prevent="handleSubmit">
                <VueStripePaymentElement />

                <Button size="md" type="submit" :disabled="loading" class="mt-10 w-full">
                    {{ loading ? 'Processing...' : `Pay ` }}
                </Button>
            </form>
        </VueStripeElements>

        <div v-else class="spinner w-full flex-center">
            <Icon icon="eos-icons:loading" class="text-7xl" />
        </div>
    </VueStripeProvider>
</template>
