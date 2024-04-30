import { $, component$, useComputed$, useOn, useSignal } from "@builder.io/qwik";
import { PhFooPeinapple } from "../icons/icons";

const Play = component$(() => {
    const cordients = useSignal({x: 0, y: 0});

    useOn("mousemove", $((e) => {
        cordients.value = {x: e.clientX, y: e.clientY};
    }))

    const yComputed = useComputed$(() => `${cordients.value.y}px`);

    return (
        <div class="flex flex-col items-center">
            <div class="grid grid-cols-3 w-1/2 bg-orange-900 h-80 border-b border-orange-600">
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-r border-orange-800">
                    <span class=""></span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full relative ">
                    <span class="absolute left-1/2 transform -translate-x-1/2"
                    style={{top: yComputed.value}}><PhFooPeinapple class="h-16 w-16 pt-2" /></span>
                </p>
                <p class="text-emerald-100 text-2xl font-roundsans font-extrabold place-self-center text-center h-full w-full border-l border-orange-800">
                    <span class=""></span>
                </p>
            </div>
            <div class="grid grid-cols-3 w-1/2 bg-orange-900 h-80  border-b border-orange-600">
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
            <div class="grid grid-cols-3 w-1/2 bg-orange-900 h-80">
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