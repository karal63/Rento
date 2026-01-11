import { onMounted, onUnmounted, type Ref } from 'vue';

export const useClickOutside = (
    elRef: Ref<HTMLElement | null>,
    callback: () => void,
    isAllowed?: Ref<boolean>
) => {
    onMounted(() => {
        document.addEventListener('click', e => handleClick(e));
    });

    onUnmounted(() => removeEventListener('click', e => handleClick(e)));

    const handleClick = (e: Event) => {
        if (!isAllowed?.value || !elRef.value) return;

        if (!elRef.value.contains(e.target as HTMLElement)) {
            callback();
        }
    };
};
