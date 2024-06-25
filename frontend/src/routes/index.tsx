import { type Session } from "@auth/core/types";
import { component$ } from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  type RequestHandler,
} from "@builder.io/qwik-city";
import CoolFoo from "~/media/CoolFooPeinApple.png?jsx"

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (isSignedIn) {
    throw event.redirect(302, `/client/play`);
  }
};

export default component$(() => {
  return (
    <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <NavHomePageUnauthenticated />
      <MainHomePageUnauthenticated />
      <FooterHomePageUnauthenticated/>
    </div>
  );
});

export const NavHomePageUnauthenticated = component$(() => {
  return (
    <header class=" text-gray-950 dark:text-gray-50">
      <nav class="flex gap-2 items-center p-3">
        <h1 class="">FoodIt.Health</h1>
        <Link href="/">Home</Link>
        <Link href="/auth/signin">Sign In</Link>
      </nav>
    </header>
  );
});

export const MainHomePageUnauthenticated = component$(() => {
  return (
    <main class="flex-grow p-4 text-gray-950 dark:text-gray-50 ">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Welcome to FoodIt.Health
          </h1>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Sign in to start tracking your food intake.
          </p>
        </div>
        <div class="mt-12 flex justify-center">
          <CoolFoo alt="App Photo" class="rounded-lg shadow-lg max-w-md w-96 h-96"  />
        </div>
      </div>
    </main>
  );
});

export const FooterHomePageUnauthenticated = component$(() => {
  return (
    <footer class=" text-gray-950 dark:text-gray-50 p-4">
      <div class="text-center">
        <p>Footer</p>
      </div>
    </footer>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
