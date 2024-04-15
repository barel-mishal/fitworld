import { Slot, component$ } from '@builder.io/qwik';
import { routeAction$, z, zod$, type RequestHandler } from '@builder.io/qwik-city';
import { type ExtendSession } from '../plugin@auth';
import { serverInitDatabase } from '../seedDatabase';

export const onRequest: RequestHandler = (event) => {
  const session: ExtendSession | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    throw event.redirect(302, `/`);
  }
};

export const useActionMergeProfile = routeAction$(async (data, {sharedMap, redirect}) => {
  const session: ExtendSession | null = sharedMap.get('session');
  const id = session?.database.profile.id;
  if (!id) throw redirect(302, `/`);
  const token = session.database.token;
  const db = await serverInitDatabase();
  await db.authenticate(token);
  const merge = await db.merge(id, { [data.field]: data.value })
  return {
    merge
  }
}, zod$({
  value: z.string().or(z.number()).or(z.boolean()).or(z.array(z.string())).or(z.date()),
  field: z.string()
}));

export default component$(() => {
  
  // Phone size screen is 380px wide 600px tall
  // אנרגיה, חלבון, מים, פיטנס
  // ניווט בין לידרבוארד למסך הראשי
  return (  
    <>
    <Slot />
    </>
  );
});






