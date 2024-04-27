import { component$ } from '@builder.io/qwik';
import { TrackFood } from '~/components/TrackFood/trackFood';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { PhArrowBendUpLeft } from '~/components/icons/icons';

export default component$(() => {
  return (
    <HeaderMainBottomNav 
    classMain='tw '
    class="grid-rows-[40px,1fr,60px] p-0">
      <div q:slot='header' class="p-2">
        <p class="tracking-wider font-bold flex gap-2 items-center"><PhArrowBendUpLeft class="fill-rose-300" /><span class="text-rose-50">End Eating Tracking Seesion</span></p>
      </div>
      <div q:slot='main' class="p-2">
        <TrackFood />
      </div>
      <div q:slot='footer' class="flex gap-3 justify-between m-2">
        <button class="bg-rose-300/40 p-2 rounded-md outline-2 outline outline-rose-200 flex-grow">Finish</button>
        <button class="bg-rose-300/40 p-2 rounded-md outline-2 outline outline-rose-200">Finish</button>
        <button class="bg-rose-300/40 p-2 rounded-md outline-2 outline outline-rose-200">Finish</button>
        <button class="bg-rose-300/40 p-2 rounded-md outline-2 outline outline-rose-200">Finish</button>
      </div>
    </HeaderMainBottomNav>
  );
});
