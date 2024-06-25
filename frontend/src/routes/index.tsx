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
    <div class=" bg-gray-50 dark:bg-gray-950 overflow-y-scroll flex flex-col min-h-screen font-roundsans ">
      <NavHomePageUnauthenticated />
      <MainHomePageUnauthenticated />
      <FooterHomePageUnauthenticated />
    </div>
  );
});

export const NavHomePageUnauthenticated = component$(() => {
  return (
    <header class="text-gray-950 dark:text-gray-50 px-2">
      <nav class="flex gap-2 items-center *:p-3 text-xl ">
        <h1 class="font-bold flex-grow">FoodIt.Health</h1>
        <Link href="/" class="font-bold italic underline text-yellow-300">Home</Link>
        <Link href="/auth/signin" class="font-bold italic underline text-yellow-300">Sign In</Link>
      </nav>
    </header>
  );
});

export const MainHomePageUnauthenticated = component$(() => {
  return (
    <main class="flex-grow p-4 text-gray-950 dark:text-gray-50 ">
      <div class="max-w-7xl lg:grid-cols-2 items-center grid mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid place-content-center">
          <h1 class="text-center [text-wrap:balance] text-4xl font-extrabold text-gray-900 dark:text-white lg:text-left sm:text-5xl lg:text-6xl">
            Welcome to <span class="text-yellow-300">
              FoodIt.Health
            </span>
          </h1>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:text-left text-center [text-wrap:balance] ">
            The game that helps you eat better and live healthier.
          </p>
        </div>
        <div class="mt-12 flex justify-center">
          <CoolFoo alt="App Photo" class="" style={{width: 400, height: 400}} />
        </div>
      </div>
    </main>
  );
});

export const FooterHomePageUnauthenticated = component$(() => {
  return (
    <footer class="text-gray-950 dark:text-gray-50 p-4">
      <div>
        <h2>Tech Stack</h2>
        <ul class="list-disc list-inside">
          <li>React</li>
          <li>Node.JS</li>
          <li>BootStrap</li>
          <li>SurrealDB A multi-model database</li>
          <li>Tailwind CSS</li>
          <li>shadcn UI</li>
          <li>Qwik</li>
          <li>QwikCity</li>
        </ul>
      </div>
      <div class="text-center">
        <p>
          &copy; 2021 FoodIt.Health. All rights reserved.
        </p>
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
