<script setup lang="ts">
    import { Button } from '@/shared/ui/button';
</script>

<template>
    <div class="shadow-xl hover:shadow-md transition rounded-bl-xl rounded-br-md cursor-pointer">
        <div>
            <img
                src="https://cylindersi.pl/wp-content/uploads/2022/08/Lamborghini-Huracan-Evo-Sylwetka.jpg"
                alt=""
                class="rounded-tl-xl rounded-tr-md"
            />
        </div>
        <div class="h-[400px] px-8 py-10 flex-col justify-between">
            <div>
                <h1 class="text-2xl font-bold">Lamborghini Huracán EVO</h1>

                <div class="mt-8 text-lg flex-col gap-3 text-main-gray">
                    <div class="flex-between">
                        <p>Acceleration:</p>
                        <p>2,9 s do 100km/h</p>
                    </div>
                    <div class="flex-between">
                        <p>Transmission:</p>
                        <p>Auto</p>
                    </div>
                    <div class="flex-between">
                        <p>Power:</p>
                        <p>640 KM / 600 Nm</p>
                    </div>
                    <div class="flex-between">
                        <p>Number of seats:</p>
                        <p>2</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-end">
                <!-- <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-green-500 rounded-xl"></div>
                    <p class="text-lg">Online reservation available</p>
                </div> -->
                <div>
                    <p class="text-xl mt-8 font-bold">Od 1500 zł</p>
                    <p class="text-sm text-main-gray">cena netto/doba przy min 30 dniach</p>
                </div>

                <Button>RESERVE</Button>
            </div>
        </div>
    </div>
</template>
