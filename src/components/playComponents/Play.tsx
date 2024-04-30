import { component$ } from "@builder.io/qwik";

const Play = component$(() => {

    return (
        <div class="flex flex-col items-center">
            <div class="grid grid-cols-3 w-1/2 bg-orange-900 h-60 border-b border-orange-600">
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-r border-orange-800">
                    <span class=""></span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full ">
                    <span class="">1</span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-l border-orange-800">
                    <span class=""></span>
                </p>
            </div>
            <div class="grid grid-cols-3 w-1/2 bg-orange-900 h-60  border-b border-orange-600">
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-r border-orange-800">
                    <span class=""></span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full ">
                    <span class="">2</span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-l border-orange-800">
                    <span class=""></span>
                </p>
            </div>
            <div class="grid grid-cols-3 w-1/2 bg-orange-900 h-60">
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-r border-orange-800">
                    <span class=""></span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full ">
                    <span class="">3</span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-l border-orange-800">
                    <span class=""></span>
                </p>
            </div>
        </div>
    )
});

export default Play;