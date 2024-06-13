import { component$ } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";

export default component$(() => {
  return (
    <div
      class={cn(
        "grid h-screen grid-rows-[1fr,30px] bg-gray-950 p-3 text-gray-50",
      )}
    >
      something
    </div>
  );
});
