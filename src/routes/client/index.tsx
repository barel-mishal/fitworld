import { component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export default component$(() => {

  return (
  <div class={cn("grid grid-rows-[1fr,30px] h-screen text-gray-50 p-3 bg-gray-950")}>
    something
  </div>
  );
});
