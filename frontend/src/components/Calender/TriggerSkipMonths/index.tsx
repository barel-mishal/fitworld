import { component$, useContext } from "@builder.io/qwik";
import { PhArrowLeft } from "~/components/icons/icons";
import { contextCalender } from "../WarperContext";

export const TriggerSkipMonths = component$(() => {
    const cx = useContext(contextCalender);
    return <>
        <button><PhArrowLeft onClick$={cx.moveBackward} class="fill-current" /></button>
        <button><PhArrowLeft onClick$={cx.moveForward} class="rotate-180 fill-current" /></button>
    </>
});