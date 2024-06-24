import { type Session } from "@auth/core/types";
import { component$ } from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  type RequestHandler,
} from "@builder.io/qwik-city";

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (isSignedIn) {
    throw event.redirect(302, `/client/play`);
  }
};

import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="flex flex-col min-h-screen">
      <NavHomePageUnauthenticated />
      <MainHomePageUnauthenticated />
      <FooterHomePageUnauthenticated/>
    </div>
  );
});

export const NavHomePageUnauthenticated = component$(() => {
  return (
    <header class="bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50">
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
    <main class="flex-grow p-4 text-gray-950 dark:text-gray-50 bg-gray-50 dark:bg-gray-950">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">Welcome to FoodIt.Health</h1>
        <div class="flex items-center">
          <img src="placeholder.jpg" alt="App Photo" class="w-1/3 h-auto rounded-lg shadow-lg mr-4" />
          <div>
            <h2 class="text-2xl font-semibold">Track your food intake effortlessly</h2>
            <p class="mt-2">Sign in to start tracking your food intake.</p>
          </div>
        </div>
      </div>
    </main>
  );
});

export const FooterHomePageUnauthenticated = component$(() => {
  return (
    <footer class="bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50 p-4">
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
