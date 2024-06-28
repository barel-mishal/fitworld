import { component$, useContext } from "@builder.io/qwik";
import { contextCalender } from "../WarperContext";
import { cn } from "@qwik-ui/utils";
import { PhBlankCalender } from "~/components/icons/icons";
import { resetTime } from "~/util/getDates";



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

    {cx.computedCalender.value.map((week, i) => (
      <tr key={i} class="">
        {week.map((day, j) => {
            const isSameDay = resetTime(cx.store.now).getTime() === resetTime(day).getTime();
            const isSameMonth = cx.store.currentView.getMonth() === day.getMonth();
            return (
              <td key={j} class={cn("text-xs text-center p-2", isSameMonth ? "text-gray-200" : "text-gray-500")}>
                <div class="grid place-items-center relative">
                  <p class="col-start-1 row-start-1 ">{day.getDate()}</p>
                  {isSameDay && <PhBlankCalender class="h-9 w-9 fill-current col-start-1 row-start-1 absolute -bottom-[7px]" />}
                </div>
              </td>
          );
      })}
      </tr>
    ))}
    </tbody>
  </table>
  )
});

