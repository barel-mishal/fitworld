import { Slot, component$ } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import { type ExtendSession } from '../plugin@auth';

export const onRequest: RequestHandler = (event) => {
  const session: ExtendSession | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    throw event.redirect(302, `/`);
  }
  console.log('session', session.database.profile);
};

export default component$(() => {
  
  // Phone size screen is 380px wide 600px tall
  // אנרגיה, חלבון, מים, פיטנס
  // ניווט בין לידרבוארד למסך הראשי
  return (  
    <Slot />
  );
});






