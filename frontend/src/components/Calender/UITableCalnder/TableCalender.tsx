import { component$, useContext } from "@builder.io/qwik";
import { contextCalender } from "../WarperContext";
import { cn } from "@qwik-ui/utils";



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

    {cx.computedCalender.value.reduce((prev, curr, index) => {
      if (index % 7 === 0) {
        // Start a new week
        return prev.concat([[curr]]);
      } else {
        // Add to the current week
        prev[prev.length - 1] = prev[prev.length - 1].concat(curr);
        return prev;
      }
    }, [] as Date[][]).map((week, i) => (
      <tr key={i}>
        {week.map((day, j) => (
          <td key={j} class={cn("text-xs text-center p-2", cx.store.now.getMonth() !== day.getMonth() && "text-gray-600")}>{day.getDate()}</td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
  )
});

