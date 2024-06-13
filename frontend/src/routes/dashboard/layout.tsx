import { component$, Slot } from "@builder.io/qwik";
import { Dashboard } from "~/components/layout_blocks/dashboard_layout_components/dashboard";
import { useAuthSession, useAuthSignout } from "../plugin@auth";
import { type RequestHandler } from "@builder.io/qwik-city";
import { type Session } from "@auth/core/types";

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    throw event.redirect(302, `/`);
  }
};

export default component$(() => {
  const sc = useAuthSession();
  const signout = useAuthSignout();
  return (
    <>
      <Dashboard name={sc.value?.user?.name ?? ""} signout={signout}>
        <Slot />
      </Dashboard>
    </>
  );
});
