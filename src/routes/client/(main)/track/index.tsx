import { component$ } from '@builder.io/qwik';
import { TrackFood } from '~/components/TrackFood/trackFood';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';

export default component$(() => {
  return (
    <HeaderMainBottomNav 
    classMain='tw '
    class="grid-rows-[40px,1fr,60px] p-0">
      <div q:slot='header' class="p-2">
        <p class="tracking-wider font-bold">Your Food Records</p>
      </div>
      <div q:slot='main' class="p-2">
        <TrackFood />
      </div>
      <div q:slot='footer' class="p-2"><BottomNavBar flag={{class: "--tw bg-sky-300/20 p-1 rounded-md outline-2 outline outline-indigo-200"}} /></div>
    </HeaderMainBottomNav>
  );
});
