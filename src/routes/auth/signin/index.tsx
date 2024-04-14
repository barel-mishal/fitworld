import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { Button } from '~/components/ui/button/button';
import { useAuthSignin } from '~/routes/plugin@auth';
import { BsGoogle, BsCompass } from '@qwikest/icons/bootstrap';
import { type RoutesLiteral } from '~/util/types';

export default component$(() => {
  const signIn = useAuthSignin();
  const route: RoutesLiteral = "/client/play/" as "/client/(main)/play/"
  return (
    <main class={"flex flex-col items-center justify-center h-screen bg-sky-100"}>
      <div class={"grid grid-rows-[55px,20px,30px,100px] gap-4 bg-white p-10 rounded-3xl max-w-[500px] lg:min-w-[600px]"}>
        <div class="flex gap-2 items-center">
          <BsCompass class="fill-sky-800 w-10 h-10" width={30} height={30} />
          <h1 class="text-sky-950 text-3xl font-bold">FitWorld</h1>
        </div>
        <h1 class="text-xl text-sky-700 font-semibold">Sign In</h1>
        <p class="text-sky-800">Sign in with your google account</p>
        <Form action={signIn} class="self-center">
          <input type="hidden" name="providerId" value="google" />
          <input type="hidden" name="options.callbackUrl" value={route} />
          <Button class={"group bg-sky-950 outline-1 outline hover:outline-sky-950 text-sky-200 gap-4 hover:bg-sky-100 hover:text-sky-950 transition-all delay-75 duration-200 ease-in-out"}>
            <BsGoogle/>
            <p class="text-sky-100 group-hover:text-sky-950 transition-all delay-75 duration-200 ease-in-out">Sign In with Google</p>
          </Button>
        </Form>   
        <p class="flex flex-col gap-2 text-sky-800">
          <span class="[text-wrap:balance]">Not your computer? Use a private browsing window to sign in.</span> 
          <a href="#" class="text-sky-600 underline">Learn more</a>
        </p>
      </div>
    </main>
  );
});
