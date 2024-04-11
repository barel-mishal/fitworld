import { Slot, component$ } from '@builder.io/qwik';


export default component$(() => {
  // Phone size screen is 380px wide 600px tall
  return (
    <div class="grid grid-rows-[40px,1fr,40px] h-screen text-emerald-50">
      <div class="bg-emerald-950">
        <Slot name="header" />
      </div>
      <div class="bg-emerald-950 overflow-y-auto h-full">
        <Slot name="main" />
      </div>
      <div class="bg-emerald-950">
        <Slot name="footer" />
      </div>
    </div>
  );
});
