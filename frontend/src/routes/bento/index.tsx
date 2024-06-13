import { component$ } from "@builder.io/qwik";
import { BentoGrid } from "~/components/BentoGrid/BentoGrid";

export default component$(() => {
  return (
    <div class="overflow-auto">
      <BentoGrid />
    </div>
  );
});
