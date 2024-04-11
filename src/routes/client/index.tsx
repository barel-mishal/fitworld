import { type Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import HeaderMainBottomNav from '~/components/gamelayouts/smallScreens/headerMainBottomNav';
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
  return (
  
    <HeaderMainBottomNav >
      <div q:slot='header'>אנרגיה, חלבון, מים, פיטנס</div>
      <div q:slot='main'>הדרך שלי <AppLink route="/client/Assessment/">Hello</AppLink></div>
      <div q:slot='footer'>ניווט בין לידרבוארד למסך הראשי</div>
    </HeaderMainBottomNav>
  );
});
