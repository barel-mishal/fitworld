import { Slot, component$ } from '@builder.io/qwik';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { BottomNavBar, TopNavBar } from '~/components/layout_blocks/NavBar/Navs';


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






