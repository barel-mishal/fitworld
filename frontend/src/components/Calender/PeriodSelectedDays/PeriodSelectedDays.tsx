import { component$, useContext } from "@builder.io/qwik"
import { contextCalender } from "../WarperContext"

export default component$(() => {
    const cal = useContext(contextCalender);
    
    return (
        <>
            <p>{cal.selectedMonth.value?.length}</p>
            <p class="text-xs [text-wrap:balance]">Months Partialy</p>
        </>
    )
    
})