import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { BsGoogle } from '@qwikest/icons/bootstrap';
import { Button } from '~/components/ui/button/button';
import { useAuthSignin } from '~/routes/plugin@auth';



export default component$(() => {
  const signIn = useAuthSignin();
  return (
    <div>
      <Form action={signIn} class="self-center">
        <input type="hidden" name="providerId" value="google" />
        <input type="hidden" name="options.callbackUrl" value="/dashboard" />
        <Button class={"group bg-sky-950 outline-1 outline hover:outline-sky-950 text-sky-200 gap-4 hover:bg-sky-100 hover:text-sky-950 transition-all delay-75 duration-200 ease-in-out"}>
          <BsGoogle/>
          <p class="text-sky-100 group-hover:text-sky-950 transition-all delay-75 duration-200 ease-in-out">Sign In with Google</p>
        </Button>
      </Form>
    </div>
  );
});
