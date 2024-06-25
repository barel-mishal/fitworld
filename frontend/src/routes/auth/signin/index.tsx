import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { useAuthSignin } from "~/routes/plugin@auth";
import { BsGoogle } from "@qwikest/icons/bootstrap";
import { type RoutesLiteral } from "~/util/types";
import SmailFoo from "~/media/FooSmailPeinApple.png?jsx";

export default component$(() => {
  const signIn = useAuthSignin();
  const route: RoutesLiteral = "/client/play/" as "/client/(main)/play/";
  return (

    <main class="w-full grid place-content-center bg-cover bg-center relative h-screen font-roundsans font-bold">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-800 to-transparent opacity-75"></div>
      <div class="relative  z-10 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 class="text-4xl font-extrabold text-center mb-5 dark:text-yellow-200 text-sky-950">
          Welcome to FoodIt.Health
        </h1>
        <div class="flex justify-center mb-5">
          <SmailFoo class="w-32 h-32 md:w-40 md:h-40" />
        </div>
        <p class="text-center mb-5 text-gray-700 dark:text-gray-300">
          Hi there! I am Foo. Let's connect and start our journey to a healthier you.
        </p>
        <Form action={signIn} class="flex flex-col items-center">
          <input type="hidden" name="providerId" value="google" />
          <input type="hidden" name="options.callbackUrl" value={route} />
          <Button
            type="submit"
            class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            <BsGoogle class="text-xl" />
            <span class="text-sky-100 transition-all delay-75 duration-200 ease-in-out group-hover:text-sky-950">
              Connect with Google
            </span>
          </Button>
        </Form>
      </div>
    </main>
  );
});


