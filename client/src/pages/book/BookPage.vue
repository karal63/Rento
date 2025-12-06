<script setup lang="ts">
    import { useCarStore } from '@/entities/car';
    import { Input } from '@/shared/ui';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { BookingSummary } from '@/widgets';

    const router = useRouter();
    const carStore = useCarStore();
    const nameInput = ref('');

    onMounted(() => {
        if (!carStore.selectedCar?._id) router.back();
    });
</script>

<template>
    <div>
        <main class="max-w-[1000px] m-auto 0 px-5 mt-32 flex gap-10">
            <BookingSummary />
            <form class="w-2/3 flex-col gap-8">
                <div>
                    <h2 class="text-2xl mb-3">Rent details</h2>
                    <div class="flex-col gap-2">
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Name"
                            class="w-full"
                        />
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Second name"
                            class="w-full"
                        />
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Email addres"
                            class="w-full"
                        />
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Phone number"
                            class="w-full"
                        />
                    </div>
                </div>

                <div>
                    <h2 class="text-2xl mb-3">Personal details</h2>
                    <div class="flex-col gap-2">
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Name"
                            class="w-full"
                        />
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Second name"
                            class="w-full"
                        />
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Email addres"
                            class="w-full"
                        />
                        <Input
                            v-model="nameInput"
                            size="medium"
                            placeholder="Phone number"
                            class="w-full"
                        />
                    </div>
                </div>
            </form>
        </main>
    </div>
</template>
