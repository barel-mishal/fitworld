import { component$, useVisibleTask$ } from "@builder.io/qwik";
import HeaderMainBottomNav from "~/components/gamelayouts/smallScreens/headerMainBottomNav";
import {
  TopNavBar,
  BottomNavBar,
} from "~/components/layout_blocks/NavBar/Navs";
import { loadScript } from "@paypal/paypal-js";
import Play from "~/components/playComponents/Play";
import { type ExtendSession, useAuthSession } from "~/routes/plugin@auth";
import { formatNumber } from "~/util/twoDecimalPoints";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import serverGetUserOverview from "~/routes/api/service_user_overview/service_user_overview";
import { type RoutesLiteral } from "~/util/types";

export const useLoadUserOverview = routeLoader$(async function () {
  const userOverview = await serverGetUserOverview();
  return userOverview;
});

export const onRequest: RequestHandler = (event) => {
  const session: ExtendSession | null = event.sharedMap.get("session");
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    const path: RoutesLiteral = "/";
    throw event.redirect(302, path);
  }
  const overview = session.database.profile.overview;
  if (!overview || "missing" in overview) {
    const path: RoutesLiteral = "/client/Assessment/";
    throw event.redirect(302, path);
  }
};

export default component$(() => {
  const userOverview = useLoadUserOverview().value;

  if (!userOverview.success) {
    return <div>Error: {userOverview.error}</div>;
  }
  const auth = useAuthSession().value as ExtendSession | undefined;
  const overview = auth?.database.profile.overview;
  if (!overview || "missing" in overview) {
    return <div>Error: {overview?.missing}</div>;
  }

  const steps = userOverview.value?.overview.lastSteps;

  const firstSection =
    steps?.at(0)?.section ?? 0;
  const firstUnit =
    steps?.at(0)?.unit ?? 0;
  const firstLevel =
    steps?.at(0)?.level ?? 0;
  return (
    <HeaderMainBottomNav
      classMain="tw "
      class="grid-rows-[40px,1fr,58px] px-2 pt-2"
    >
      <div q:slot="header">
        <TopNavBar
          streak={0}
          water={0}
          heart={0}
          dna={formatNumber(overview.TEE)}
        />
      </div>
      <div q:slot="main">
        <Play
          currentSection={firstSection}
          currentUnit={firstUnit}
          currentLevel={firstLevel}
        />
      </div>
      <div q:slot="footer" class="">
        <BottomNavBar
          flag={{
            class:
              "--tw bg-sky-300/20 p-1 rounded-md outline-2 outline outline-indigo-200",
          }}
        />
      </div>
    </HeaderMainBottomNav>
  );
});

export const Paypal = component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    loadScript({ clientId: "test", currency: "USD" })
      .then((paypal) => {
        if (!paypal || !paypal.Buttons) {
          return;
        }
        paypal
          .Buttons({})
          .render("#your-container-element")
          .then(() => {
            console.log("PayPal Buttons rendered");
          })
          .catch((error) => {
            console.error("failed to render the PayPal Buttons", error);
          });

        return paypal;
      })
      .catch((error) => {
        console.error("failed to load the PayPal JS SDK script", error);
      });
  });
  return (
    <>
      <div id="your-container-element"></div>
    </>
  );
});
