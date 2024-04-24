import { type Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import { Form, type RequestHandler } from '@builder.io/qwik-city';
import { BsGoogle } from '@qwikest/icons/bootstrap';
import { Button } from '~/components/ui/button/button';
import { useAuthSignin } from '~/routes/plugin@auth';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (isSignedIn) {
    throw event.redirect(302, `/client/play`);
  }
};


export default component$(() => {
  return (
    <div class="grid h-screen bg-sky-50 p-2 gap-2">
      <div class="bg-sky-300 rounded-lg grid place-content-start p-3">
        <h1 class="text-xl text-sky-100">
          You are not signed out, we very much appreciate your visit. Hope you have a great day.
        </h1>
      </div>
      <div class="bg-sky-400 rounded-lg grid place-content-center">
        <div class="flex flex-col gap-2">
          <h1 class="text-5xl text-sky-100">Main page</h1>
          <ButtonSignIn />
        </div>
      </div>
      <div class="bg-sky-500 rounded-lg grid place-content-center">
        <div class="flex flex-col gap-2">
          <h1 class="text-5xl text-sky-100">Sign In</h1>
          <ButtonSignIn />
        </div>
      </div>
      
    </div>
  );
});

export const ButtonSignIn = component$(() => {
  const signIn = useAuthSignin();
  return (
    <Form action={signIn} class="self-center">
      <input type="hidden" name="providerId" value="google" />
      <input type="hidden" name="options.callbackUrl" value="/" />
      <Button class={"group bg-sky-950 outline-1 outline hover:outline-sky-950 text-sky-200 gap-4 hover:bg-sky-100 hover:text-sky-950 transition-all delay-75 duration-200 ease-in-out"}>
        <BsGoogle/>
        <p class="text-sky-100 group-hover:text-sky-950 transition-all delay-75 duration-200 ease-in-out">Sign In with Google</p>
      </Button>
    </Form>
  );
});
