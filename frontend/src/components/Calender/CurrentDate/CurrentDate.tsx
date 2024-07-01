import { component$, useContext } from "@builder.io/qwik"
import { contextCalender } from "../WarperContext"
import { formatedMonthNameAndYear } from "~/util/formatDate";

export default component$(() => {
    const cal = useContext(contextCalender);
    
    return (
        <>
            {formatedMonthNameAndYear(cal.store.currentView)}
        </>
    )
    
})