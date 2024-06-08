import { component$ } from "@builder.io/qwik";
import { PhFooPeinapple } from "~/components/icons/icons";

export default component$(() => {
  return (
    <div class="flex place-items-start font-roundsans text-2xl font-extrabold tracking-wider text-orange-100 [text-wrap:balance]">
      <PhFooPeinapple class="h-32 w-32" />
      <p>Let's get to know you better!</p>
    </div>
  );
});
