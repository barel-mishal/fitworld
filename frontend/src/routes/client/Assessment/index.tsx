import { component$ } from "@builder.io/qwik";
import { PhFooPeinapple } from "~/components/icons/icons";

export default component$(() => {
  return (
    <div class="grid justify-self-start">
      <PhFooPeinapple class="h-32 w-32" />
      <p class="text-center text-3xl tracking-wider">
        Hi there! I'm Foo, your friendly guide on this exciting Foodit journey!
        🌟
      </p>
    </div>
  );
});
