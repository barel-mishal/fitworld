import { component$ } from '@builder.io/qwik';
import { TrackFood } from '~/components/TrackFood/trackFood';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';

export default component$(() => {
  return (
    <HeaderMainBottomNav 
    classMain='tw '
    class="grid-rows-[40px,1fr] p-0">
      <div q:slot='header' class="p-2">
        <p class="tracking-wider font-bold">Your Food Records</p>
      </div>
      <div q:slot='main' class="p-2">
        <TrackFood />
      </div>
    </HeaderMainBottomNav>
  );
});
