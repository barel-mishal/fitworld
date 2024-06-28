import { component$, useContext } from "@builder.io/qwik";
import { contextCalender } from "../WarperContext";
import { cn } from "@qwik-ui/utils";
import { reduceToWeeks } from "~/util/getDates";



interface CalnderProps {

}

export default component$<CalnderProps>(() => {

  const cx = useContext(contextCalender);

  console.log(cx.computedCalender.value.length);

  return (
    <table class="w-full ">
    <thead class="h-9">
      <tr>
        <th class="font-bold">Su</th>
        <th class="font-bold">Mo</th>
        <th class="font-bold">Tu</th>
        <th class="font-bold">Me</th>
        <th class="font-bold">Th</th>
        <th class="font-bold">Fr</th>
        <th class="font-bold">Sa</th>
      </tr>
    </thead>
    <tbody>

    {reduceToWeeks(cx.computedCalender.value).map((week, i) => (
      <tr key={i} class="">
        {week.map((day, j) => (
          <td key={j} class={cn("text-xs text-center p-2", cx.store.now.getMonth() !== day.getMonth() && "text-gray-600")}>{day.getDate()}</td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
  )
});

