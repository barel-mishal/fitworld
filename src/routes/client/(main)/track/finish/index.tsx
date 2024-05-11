import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="grid grid-rows-2 h-full place-items-center p-4">
      <button class="bg-emerald-600 p-2 [text-wrap:balance]">Edit Selections</button>
      <button class="bg-emerald-600 p-2 [text-wrap:balance]">Yap that what I have eated</button>
    </div>
  );
});
