<script setup lang="ts">
    import { computed, onUnmounted, ref, watch } from 'vue';
    import { DIALOG_TYPE } from '../model/types';
    import { useDialogStore } from '../model/dialog.store';

    import {
        TransitionRoot,
        TransitionChild,
        Popover,
        PopoverButton,
        PopoverPanel,
    } from '@headlessui/vue';
    import { Icon } from '@iconify/vue';
    import { useI18n } from 'vue-i18n';

    const dialogStore = useDialogStore();
    const { t } = useI18n();
    const timeout = ref<number | null>(null);

    const getDialog = computed(() => {
        switch (dialogStore.dialog.type) {
            case DIALOG_TYPE.Error:
                return {
                    icon: {
                        value: 'ic:sharp-error',
                        class: 'text-red-500',
                    },
                    button: 'bg-red-500/20 text-red-500 hover:bg-red-500/30 focus-visible:ring-red-500',
                };
            case DIALOG_TYPE.Warning:
                return {
                    icon: {
                        value: 'mingcute:warning-fill',
                        class: 'text-yellow-500',
                    },
                    button: 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 focus-visible:ring-yellow-500',
                };
            case DIALOG_TYPE.Success:
                return {
                    icon: {
                        value: 'ix:success-filled',
                        class: 'text-green-500',
                    },
                    button: 'bg-green-500/20 text-green-500 hover:bg-green-500/30 focus-visible:ring-green-500',
                };
            case DIALOG_TYPE.Info:
                return {
                    icon: {
                        value: 'material-symbols:info-rounded',
                        class: 'text-blue-500',
                    },
                    button: 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 focus-visible:ring-blue-500',
                };
        }

        return {
            icon: {
                value: 'material-symbols:info-rounded',
                class: 'text-blue-500',
            },
            button: 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 focus-visible:ring-blue-500',
        };
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
    <Popover class="relative z-20">
        <PopoverButton class="hidden" />

        <TransitionRoot appear :show="dialogStore.dialog.isOpen" as="template">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
                <PopoverPanel
                    static
                    class="fixed top-5 left-1/2 transform -translate-x-1/2 w-[350px] sm:w-[440px] rounded-md bg-popover text-popover-foreground p-4 border border-border text-left shadow-xl flex gap-3"
                >
                    <div>
                        <Icon
                            :icon="getDialog.icon.value"
                            class="text-2xl"
                            :class="getDialog.icon.class"
                        />
                    </div>

                    <div>
                        <h3 class="text-lg font-medium leading-6">
                            {{ dialogStore.dialog.message }}
                        </h3>

                        <div class="mt-2">
                            <p class="text-sm text-main-gray">
                                {{ dialogStore.dialog.description }}
                            </p>
                            <ul v-if="dialogStore.dialog.context" class="text-sm text-red-500 mt-2">
                                <li v-for="ctx in dialogStore.dialog.context" :key="ctx.field">
                                    <p class="font-medium">
                                        {{ t(`app.fields_validation.${ctx.field}`) }}
                                    </p>
                                    <ul class="text-xs pl-2">
                                        <li v-for="constraint in ctx.constraints" :key="constraint">
                                            - {{ t(`app.fields_validation.${constraint}`) }}
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div v-if="!dialogStore.dialog.context" class="mt-4 hidden sm:block">
                            <button
                                type="button"
                                class="cursor-pointer inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                :class="getDialog.button"
                                @click="handleCloseDialog"
                            >
                                {{ t('app.protected_users_page.close_dialog_btn') }}
                            </button>
                        </div>
                    </div>

                    <button
                        @click="dialogStore.hide()"
                        class="sm:hidden absolute right-3 top-3 cursor-pointer p-1 rounded-md"
                    >
                        <Icon icon="material-symbols-light:close" class="text-xl" />
                    </button>
                </PopoverPanel>
            </TransitionChild>
        </TransitionRoot>
    </Popover>
</template>
