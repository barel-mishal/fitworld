import { type Session } from "@auth/core/types";
import { component$ } from "@builder.io/qwik";
import {
  Link,
  server$,
  type DocumentHead,
  type RequestHandler,
} from "@builder.io/qwik-city";
import { serverConnectRootDB } from "./plugin@auth";

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (isSignedIn) {
    throw event.redirect(302, `/client/play`);
  }
};

export const serverTrySignin = server$(async () => {
  const db = await serverConnectRootDB();
  await db.run();

  const session = await db.action(async (db) => {
    try {
      console.log("signin start")
      const tokenRoot = await db.signin({
        username: 'root',
        password: 'root',
      });
      await db.authenticate(tokenRoot);
      console.log("signin end"
        , await db.ready,
        db.connection
      );

      const token = await db.signup({
        scope: "account",
        database: "database",
        namespace: "namespace",
        pass: "4352344", 
        providerId: "4352344",
        email: "barel@mmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { success: true, value: token };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message, path: error.stack };
      }
    }
  });
  console.log(session);
  await db.dispose();
  return session;
});


export default component$(() => {
  return (
    <>
      <div>Home</div>
      <Link href="/auth/signin">Sign In</Link>
      <button class="btn" onClick$={async () => await serverTrySignin()}>signup</button>
    </>
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


