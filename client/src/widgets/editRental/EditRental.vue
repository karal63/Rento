<script setup lang="ts">
    import {
        buildPatchPayload,
        RENTAL_STATUS,
        useEditRentalMutation,
        useRentalQuery,
    } from '@/entities/rental';
    import { showDialog, showErrorDialog } from '@/features/dialog';
    import { buildRentalPayload, RentalForm, type RentalFormType } from '@/features/rentalForm';
    import { DateRangePicker } from '@/features/selectDateRange';
    import type { AppError } from '@/shared/model';
    import { Dropdown } from '@/shared/ui';
    import { Icon } from '@iconify/vue';
    import { required } from '@vuelidate/validators';
    import { computed, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute, useRouter } from 'vue-router';

    const router = useRouter();
    const { t } = useI18n();
    const { params } = useRoute();

    const editRentalMutation = useEditRentalMutation();
    const { data } = useRentalQuery(params['id'] as string);

    const rules = {
        user: { required },
        car: { required },
        period: {
            dateFrom: { required },
            dateTo: { required },
        },
        pickupLocation: { required },
        pickupTime: { required },
        status: { required },
    };

    const rental = ref<RentalFormType>({
        user: null,
        car: null,
        period: {
            dateFrom: null,
            dateTo: null,
        },
        pickupLocation: '',
        pickupTime: '',
        status: '',
    });
    const isStatusDropdownOpen = ref(false);

    const edit = async () => {
        const payload = buildPatchPayload(data.value, buildRentalPayload(rental.value));

        try {
            await editRentalMutation.mutateAsync({
                rentalId: params['id'] as string,
                payload,
            });
            showDialog(
                'success',
                t('app.message.rental_edited'),
                t('app.message.rental_edited_desc', { name: data.value?.userId.name })
            );
            router.push('/admin/rentals');
        } catch (error) {
            console.log(error);
            showErrorDialog(error as AppError);
        }
    };

    watch(
        data,
        () => {
            if (!data.value) return;
            rental.value.car = data.value.carId;
            rental.value.user = data.value.userId;
            rental.value.period.dateFrom = new Date(data.value.rentFrom);
            rental.value.period.dateTo = new Date(data.value.rentTo);
            rental.value.pickupLocation = data.value.pickupLocation;
            rental.value.pickupTime = data.value.pickupTime;
            rental.value.status = data.value.status;
        },
        { immediate: true }
    );

    const getIcon = computed(() => {
        if (rental.value.status === RENTAL_STATUS.Active)
            return 'grommet-icons:time'; //fontisto:checkbox-active
        else if (rental.value.status === RENTAL_STATUS.Cancelled)
            return 'material-symbols:chat-error-outline';
        else if (rental.value.status === RENTAL_STATUS.Pending) return 'wi:time-7';
        else if (rental.value.status === RENTAL_STATUS.Completed)
            return 'material-symbols:draft-outline';

        return 'material-symbols:draft-outline';
    });

    const getClasses = computed(() => {
        if (rental.value.status === RENTAL_STATUS.Active) {
            return 'bg-green-400/20 text-green-600 hover:bg-green-400/30 transition-all';
        } else if (rental.value.status === RENTAL_STATUS.Cancelled) {
            return 'bg-red-400/20 text-red-600 hover:bg-red-400/30 transition-all';
        } else if (rental.value.status === RENTAL_STATUS.Pending) {
            return 'bg-yellow-400/20 text-yellow-600 hover:bg-yellow-400/30 transition-all';
        } else if (rental.value.status === RENTAL_STATUS.Completed) {
            return 'bg-main-gray-bg text-opposite-theme/20 hover:bg-gray-400/30 transition-all';
        }

        return 'bg-main-gray-bg text-pure-theme/50';
    });

    const statuses = [
        {
            label: t(`app.status.${RENTAL_STATUS.Completed}`),
            callback: () => (rental.value.status = RENTAL_STATUS.Completed),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Cancelled}`),
            callback: () => (rental.value.status = RENTAL_STATUS.Cancelled),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Active}`),
            callback: () => (rental.value.status = RENTAL_STATUS.Active),
        },
        {
            label: t(`app.status.${RENTAL_STATUS.Pending}`),
            callback: () => (rental.value.status = RENTAL_STATUS.Pending),
        },
    ];
</script>

<template>
    <RentalForm @handleSubmit="edit" :rules="rules" v-model:rental="rental">
        <DateRangePicker
            :car="rental.car"
            @setPeriod="rental.period = $event"
            :period="rental.period"
            :excludedId="data?._id"
        />

        <template #header>
            <div class="mb-10">
                <h1 class="text-4xl font-medium mb-4">
                    {{ t('app.rental_form.edit_title') }}
                </h1>

                <Dropdown
                    :isOpen="isStatusDropdownOpen"
                    @close="isStatusDropdownOpen = false"
                    :items="statuses"
                    class="max-w-max"
                >
                    <button
                        @click="isStatusDropdownOpen = !isStatusDropdownOpen"
                        class="rounded-md px-4 py-2 flex-between gap-2 w-44 cursor-pointer"
                        :class="getClasses"
                    >
                        <p class="flex items-center gap-2 font-semibold">
                            <Icon :icon="getIcon" />
                            {{ t(`app.status.${rental.status}`) }}
                        </p>
                        <Icon
                            icon="weui:arrow-filled"
                            class="transform rotate-90 text-xl text-main-gray"
                        />
                    </button>
                </Dropdown>
            </div>
        </template>
    </RentalForm>
</template>
