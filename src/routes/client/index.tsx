import { type Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { TopNavBar, BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { AppLink } from '~/routes.config';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    console.log("redirecting")
    throw event.redirect(302, `/`);
  }
};

export default component$(() => {
  
  // Phone size screen is 380px wide 600px tall
  // אנרגיה, חלבון, מים, פיטנס
  // ניווט בין לידרבוארד למסך הראשי
  return (
  
    <HeaderMainBottomNav 
    classMain='tw '
    class="grid-rows-[40px,1fr,40px]">
      <div q:slot='header'><TopNavBar /></div>
      <div q:slot='main'><AppLink route="/client/Assessment/">Section Getting started</AppLink></div>
      <div q:slot='footer' class=""><BottomNavBar /></div>
    </HeaderMainBottomNav>
  );
});





