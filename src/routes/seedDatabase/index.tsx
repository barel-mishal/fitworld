import { type Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = (event) => {
  
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn || session.user?.email === "dreamwork@dreamwork.network") {
    event.redirect(302, "/");
  }

};


export default component$(() => {
  return (
    <div>
      New route works.
    </div>
  );
});
