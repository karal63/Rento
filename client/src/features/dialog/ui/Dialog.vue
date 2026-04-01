<script setup lang="ts">
    import { computed, onUnmounted, ref, watch } from 'vue';
    import { DIALOG_TYPE } from '../model/types';
    import { useDialogStore } from '../model/dialog.store';
    import { useI18n } from 'vue-i18n';
    import { Alert, AlertDescription, AlertTitle } from '@/shared/shadcn/ui/alert';
    import { AlertCircleIcon, CheckCircle2Icon, OctagonAlertIcon, InfoIcon } from 'lucide-vue-next';
    import { Icon } from '@iconify/vue';

    const dialogStore = useDialogStore();
    const { t } = useI18n();
    const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

    const getIcon = computed(() => {
        switch (dialogStore.dialog.type) {
            case DIALOG_TYPE.Error:
                return AlertCircleIcon;
            case DIALOG_TYPE.Warning:
                return OctagonAlertIcon;
            case DIALOG_TYPE.Success:
                return CheckCircle2Icon;
            case DIALOG_TYPE.Info:
                return InfoIcon;
        }

        return AlertCircleIcon;
    });

    watch(
        () => dialogStore.dialog.isOpen,
        () => {
            if (timeout.value !== null) {
                clearTimeout(timeout.value);
                timeout.value = null;
            }
            timeout.value = setTimeout(() => {
                dialogStore.hide();
            }, 6000);
        }
    );

    onUnmounted(() => {
        if (timeout.value !== null) {
            clearTimeout(timeout.value);
            timeout.value = null;
        }
    });

    const handleCloseDialog = () => {
        if (timeout.value !== null) {
            clearTimeout(timeout.value);
            timeout.value = null;
        }
        dialogStore.hide();
    };
</script>

<template>
    <Transition name="dialog">
        <div
            v-if="dialogStore.dialog.isOpen"
            class="z-50 fixed left-1/2 top-5 transform -translate-x-1/2 grid w-full max-w-xl items-start gap-4"
        >
            <Alert :variant="dialogStore.dialog.type">
                <component :is="getIcon" />
                <AlertTitle>{{ dialogStore.dialog.message }}</AlertTitle>
                <AlertDescription>
                    <p>{{ dialogStore.dialog.description }}</p>
                    <ul
                        v-if="dialogStore.dialog.context && dialogStore.dialog.context?.length > 0"
                        class="mt-2 list-disc space-y-1"
                    >
                        <li v-for="ctx in dialogStore.dialog.context" :key="ctx.field">
                            <p class="font-medium">
                                {{ t(`app.fields_validation.${ctx.field}`) }}
                            </p>
                            <ul class="pl-2">
                                <li v-for="constraint in ctx.constraints" :key="constraint">
                                    - {{ t(`app.fields_validation.${constraint}`) }}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </AlertDescription>

                <button
                    @click="handleCloseDialog"
                    class="absolute right-1 top-1 cursor-pointer p-1 rounded-md text-card-foreground"
                >
                    <Icon icon="material-symbols-light:close" class="text-xl" />
                </button>
            </Alert>
        </div>
    </Transition>
</template>

<style scoped>
    .dialog-leave-to {
        transition: all 0.25s ease;
        opacity: 0;
        transform: scale(0.9) translateY(-10px);
    }
</style>
