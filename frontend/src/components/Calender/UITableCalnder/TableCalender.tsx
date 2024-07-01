import { component$, useContext } from "@builder.io/qwik";
import { contextCalender } from "../WarperContext";
import { cn } from "@qwik-ui/utils";
import { PhBlankCalender, PhLightning } from "~/components/icons/icons";
import { resetTime } from "~/util/getDates";



interface CalnderProps {

}

export default component$<CalnderProps>(() => {

  const cx = useContext(contextCalender);

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
            const isStreakDay = (!cx.store.selected || cx.store.selected.length === 0) ? false : cx.store.selected
            .map(m => resetTime(m).getTime()).includes(resetTime(day).getTime());
            return (
              <td key={j} class={cn("text-xs text-center p-2", isSameMonth ? "text-gray-200" : "text-gray-500")}>
                <div class="grid place-items-center relative">
                  <p class={cn(
                    "col-start-1 row-start-1 z-10 ", 
                    isStreakDay && "text-yellow-200"
                  )}>{day.getDate()}</p>
                  {!isStreakDay && isSameDay && <PhBlankCalender class="h-9 w-9 stroke-gray-600 col-start-1 row-start-1 absolute -bottom-[7px]" />}
                  {!isSameDay && isStreakDay && <PhLightning class="fill-yellow-600/70 row-start-1 col-start-1 " />}
                  {(isSameDay && isStreakDay) && <PhBlankCalender 
                  class="h-9 w-9 stroke-yellow-400  col-start-1 row-start-1 absolute -bottom-[7px]" />}
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

