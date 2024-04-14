import { Slot, component$ } from '@builder.io/qwik';


import { type Session } from '@auth/core/types';
import { type RequestHandler } from '@builder.io/qwik-city';

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
    <Slot />
  );
});






