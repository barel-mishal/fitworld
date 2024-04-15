import { Slot, component$, useSignal } from '@builder.io/qwik';
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

export const useActionMergeDatabase = routeAction$(async (data, {sharedMap, redirect}) => {
  const session: ExtendSession | null = sharedMap.get('session');
  const id = session?.database.profile.id;
  if (!id) throw redirect(302, `/`);
  const token = session.database.token;
  const db = await serverInitDatabase();
  await db.authenticate(token);
  const merge = await db.merge(id, { name: data.name })
  console.log('merge', merge);

  return {
    merge
  }
}, zod$({
  name: z.string()
}));

export default component$(() => {
  const signalSend = useSignal({name: "Barel Mishal"})
  const mergeAction = useActionMergeDatabase();
  
  // Phone size screen is 380px wide 600px tall
  // אנרגיה, חלבון, מים, פיטנס
  // ניווט בין לידרבוארד למסך הראשי
  return (  
    <>
    <input 
      type="text" 
      value={signalSend.value.name} 
      onInput$={(_, el) => signalSend.value = {name: el.value}} 
    />
    <button onClick$={async () => {
      const result = await mergeAction.submit(signalSend.value);
      console.log('result', result);

    }}>Merge</button>
    <Slot />
    </>
  );
});






