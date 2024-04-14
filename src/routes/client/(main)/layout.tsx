import { Slot, component$ } from '@builder.io/qwik';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { PhCaretRight, PhDNA, PhDrop, PhFlag, PhHeart, PhLightning, PhUser } from '~/components/icons/icons';
import { AppLink } from '~/routes.config';


export default component$(() => {
  
  // Phone size screen is 380px wide 600px tall
  // אנרגיה, חלבון, מים, פיטנס
  // ניווט בין לידרבוארד למסך הראשי
  return (  
    <HeaderMainBottomNav 
    classMain='tw '
    class="grid-rows-[40px,1fr,40px]">
      <div q:slot='header'><TopNavBar /></div>
      <div q:slot='main'><Slot /></div>
      <div q:slot='footer' class=""><BottomNavBar /></div>
    </HeaderMainBottomNav>
  );
});

export const TopNavBar = component$(() => {

  return (
    <ul class="grid grid-cols-4">
      <li class="grid grid-cols-2 items-center"><PhLightning class="fill-yellow-500 h-8 w-8 " /><p class="text-xs">300</p></li>
      <li class="grid grid-cols-2 items-center"><PhDrop      class="fill-sky-500 h-8 w-8"     /><p class="text-xs">200</p></li>
      <li class="grid grid-cols-2 items-center"><PhHeart     class="fill-rose-500 h-8 w-8 "   /><p class="text-xs">400</p></li>
      <li class="grid grid-cols-2 items-center"><PhDNA       class="fill-green-500 h-8 w-8 "  /><p class="text-xs">210</p></li>
    </ul>
  )
});

export const BottomNavBar = component$(() => {
  return (
    <ul class="grid grid-cols-3 ">
      <li class="grid items-center justify-items-center"><AppLink route='/client/user/'><PhCaretRight class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
      <li class="grid items-center justify-items-center"><AppLink route='/client/user/'><PhUser       class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
      <li class="grid items-center justify-items-center"><AppLink route='/client/user/'><PhFlag       class="fill-indigo-500 h-8 w-8 " /></AppLink></li>
    </ul>
  )
});




