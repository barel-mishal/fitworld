import { component$, useContext } from "@builder.io/qwik";
import { contextCalender } from "../WarperContext";



interface CalnderProps {

}

export default component$<CalnderProps>(() => {

  const cx = useContext(contextCalender);

  console.log(cx);

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
      <tr>
        <td class="text-xs text-center p-2">1</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
      </tr>
      <tr>
        <td class="text-xs text-center p-2">1</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
      </tr>
      <tr>
        <td class="text-xs text-center p-2">1</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
      </tr>
      <tr>
        <td class="text-xs text-center p-2">1</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
      </tr>
      <tr>
        <td class="text-xs text-center p-2">1</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
        <td class="text-xs text-center p-2">22</td>
      </tr>
    </tbody>
  </table>
  )
});

