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
    import { calculateRentalPrice } from '@/entities/booking';
    import { useCarStore } from '@/entities/car';
    import { useBookingStore } from '@/features/booking';
    import { useI18n } from 'vue-i18n';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import Message from '@/shared/ui/message/Message.vue';
    const carStore = useCarStore();
    const bookingStore = useBookingStore();
    const { t } = useI18n();
    const router = useRouter();

    const publishableKey =
        'pk_test_51ScRd71aiYRGwgEigAXPwQNOXdaE1KmnXKsECMimAkOUOG3ARc4F62VaFUpySHCp5Z2pwaocyS0y6eCGOODeM3BE00SdO0aVU2';
    const clientSecret = ref('');
    const loading = ref(false);
    const errorMessage = ref('');

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
        errorMessage.value = '';

        const { error } = await stripeInstance.value.confirmPayment({
            elements: elementsInstance.value,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
        });

        if (error) {
            loading.value = false;
        }
    };

    onMounted(async () => {
        if (!carStore.selectedCar) return;
        try {
            if (!bookingStore.dateRange[0] || !bookingStore.dateRange[1]) return;

            const res = await apiCreatePaymentIntent(
                carStore.selectedCar._id,
                bookingStore.dateRange[0].getTime(),
                bookingStore.dateRange[1].getTime(),
                bookingStore.location,
                bookingStore.daysCount
            );
            clientSecret.value = res.data.clientSecret;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                errorMessage.value = error.response?.data.message[0];
                loading.value = false;
            }
        }
    });

    const stripeOptions = computed(() => {
        return {
            appearance: {
                loader: 'never',
                theme: 'flat',
            },
        };
    });

    const getFullPrice = computed(() => {
        const pricePerDay = calculateRentalPrice(
            bookingStore.daysCount,
            carStore.selectedCar!.pricing
        );

        return pricePerDay * bookingStore.daysCount;
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
                    {{ loading ? 'Processing...' : `Pay ${getFullPrice}${t('app.zl')}` }}
                </Button>
            </form>
        </VueStripeElements>

        <div v-else-if="loading" class="spinner w-full flex-center">
            <Icon icon="eos-icons:loading" class="text-7xl" />
        </div>

        <Message type="warning" :message="errorMessage" />
        <Button @click="router.back" size="sm" color="transparent" class="w-full">
            {{ t('app.go_back') }}
        </Button>
    </VueStripeProvider>
</template>
