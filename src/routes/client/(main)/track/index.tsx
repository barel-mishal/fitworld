import { component$ } from '@builder.io/qwik';
import { MainTrackFood, NextTrackFood, TrackFood } from '~/components/TrackFood/trackFood';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { PhArrowBendUpLeft } from '~/components/icons/icons';
import { AppLink } from '~/routes.config';



export default component$(() => {
  return (
    <TrackFood  >
      <HeaderMainBottomNav 
      classMain='tw '
      class="grid-rows-[40px,1fr,70px] p-0">
        <div q:slot='header' class="p-2">
          <AppLink route='/client/(main)/play/'>
            <p class="tracking-wider font-bold flex gap-2 items-center"><PhArrowBendUpLeft class="fill-rose-300" /><span class="text-rose-50">End Eating Tracking Seesion</span></p>
          </AppLink>
        </div>
          <div q:slot='main' class="px-2">
            <MainTrackFood />
          </div>
          <div q:slot='footer' class="px-4">
            <NextTrackFood />
          </div>
      </HeaderMainBottomNav>
    </TrackFood>
  );
});
