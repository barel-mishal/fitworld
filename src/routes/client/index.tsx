import { component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export default component$(() => {

  return (
  <div class={cn("grid grid-rows-[1fr,30px] h-screen text-emerald-50 p-3 bg-emerald-950")}>
    something
  </div>
  );
});
