import { component$, useContext } from "@builder.io/qwik";
import { PhArrowBendUpLeft } from "~/components/icons/icons";
import { contextCalender } from "../WarperContext";

export const TriggerSkipMonths = component$(() => {
    const cx = useContext(contextCalender);
    return <>
        <button><PhArrowBendUpLeft onClick$={cx.moveBackward} class="fill-current" /></button>
        <button><PhArrowBendUpLeft onClick$={cx.moveForward} class="rotate-180 fill-current" /></button>
    </>
});