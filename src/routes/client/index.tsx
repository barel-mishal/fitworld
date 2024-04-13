import { type Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
import { PhDNA, PhDrop, PhHeart, PhLightning } from '~/components/icons/icons';
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
  
    <HeaderMainBottomNav >
      <div q:slot='header'><NavBar /></div>
      <div q:slot='main'><AppLink route="/client/Assessment/">Section Getting started</AppLink></div>
      <div q:slot='footer'><NavBar /></div>
    </HeaderMainBottomNav>
  );
});

export const NavBar = component$(() => {

  return (
    <ul class="grid grid-cols-4">
      <li class="grid grid-cols-2 items-center"><PhLightning class="fill-yellow-500 h-8 w-8 " /><p class="text-xs">300</p></li>
      <li class="grid grid-cols-2 items-center"><PhDrop      class="fill-sky-500 h-8 w-8" />    <p class="text-xs">200</p></li>
      <li class="grid grid-cols-2 items-center"><PhHeart     class="fill-rose-500 h-8 w-8 " />  <p class="text-xs">400</p></li>
      <li class="grid grid-cols-2 items-center"><PhDNA       class="fill-green-500 h-8 w-8 " /> <p class="text-xs">210</p></li>
    </ul>
  )
});




