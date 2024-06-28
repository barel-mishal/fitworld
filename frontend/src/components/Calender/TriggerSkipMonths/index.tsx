import { component$, useContext } from "@builder.io/qwik";
import { PhArrowBendUpLeft } from "~/components/icons/icons";
import { contextCalender } from "../WarperContext";

export const TriggerSkipMonths = component$(() => {
    const cx = useContext(contextCalender);
    return <>
        <button><PhArrowBendUpLeft onClick$={cx.onClickIncrement} class="fill-current" /></button>
        <button><PhArrowBendUpLeft onClick$={cx.onClickDecrement} class="rotate-180 fill-current" /></button>
        {cx.store.count}
    </>
});