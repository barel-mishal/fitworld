import { type Session } from "@auth/core/types";
import { component$ } from "@builder.io/qwik";
import { Form, type RequestHandler } from "@builder.io/qwik-city";
import { BsGoogle } from "@qwikest/icons/bootstrap";
import { Button } from "~/components/ui/button/button";
import { useAuthSignin } from "~/routes/plugin@auth";

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (isSignedIn) {
    throw event.redirect(302, `/client/play`);
  }
};

export default component$(() => {
  return (
    <div class="grid h-screen gap-2 bg-sky-50 p-2">
      <div class="grid place-content-start rounded-lg bg-sky-300 p-3">
        <h1 class="text-xl text-sky-100">
          You are not signed out, we very much appreciate your visit. Hope you
          have a great day.
        </h1>
      </div>
      <div class="grid place-content-center rounded-lg bg-sky-400">
        <div class="flex flex-col gap-2">
          <h1 class="text-5xl text-sky-100">Main page</h1>
          <ButtonSignIn />
        </div>
      </div>
      <div class="grid place-content-center rounded-lg bg-sky-500">
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
      <Button
        class={
          "group gap-4 bg-sky-950 text-sky-200 outline outline-1 transition-all delay-75 duration-200 ease-in-out hover:bg-sky-100 hover:text-sky-950 hover:outline-sky-950"
        }
      >
        <BsGoogle />
        <p class="text-sky-100 transition-all delay-75 duration-200 ease-in-out group-hover:text-sky-950">
          Sign In with Google
        </p>
      </Button>
    </Form>
  );
});
