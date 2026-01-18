import { isRef, onMounted, onUnmounted, type Ref } from 'vue';

export const useClickOutside = (
    elRef: Ref<HTMLElement | null>,
    callback: () => void,
    isAllowed?: Ref<boolean> | boolean
) => {
    const handleClick = (e: MouseEvent) => {
        const el = elRef.value;
        if (!el) return;

        const allowed = isRef(isAllowed) ? isAllowed.value : (isAllowed ?? true);

        if (!allowed) return;

        if (!el.contains(e.target as Node)) {
            callback();
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
    });
};
