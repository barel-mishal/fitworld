import { component$, useId, useVisibleTask$ } from "@builder.io/qwik";
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
import { serverDatabaseUserSession } from "~/routes/seedDatabase";

export const useLoadUserOverview = routeLoader$(async function () {
  const userOverview = await serverGetUserOverview();
  return userOverview;
});

export const onRequest: RequestHandler = async (event) => {
  const session: ExtendSession | null = event.sharedMap.get("session");
  const isSignedIn = session && new Date(session.expires) > new Date();
  if (!isSignedIn) {
    const path: RoutesLiteral = "/";
    throw event.redirect(302, path);
  }
  const dbUser = await serverDatabaseUserSession();
  if (!dbUser || !dbUser.success) {
    // TODO: Redirect to error page
    const path: RoutesLiteral = "/client/Assessment/";
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
    return <div>Error: {JSON.stringify(overview?.missing)}</div>;
  }

  const steps = userOverview.value?.overview.lastSteps;

  const firstSection =
    steps?.steps.at(0)?.section ?? 0;
  const firstUnit =
    steps?.steps.at(0)?.unit ?? 0;
  const firstLevel =
    steps?.steps.at(0)?.level ?? 0;
  return (
    <HeaderMainBottomNav
      classMain="tw "
      class=""
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
        <Paypal />
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
  const idPaypal = useId();

  // Load PayPal script when the component is visible
  useVisibleTask$(() => {
    loadScript({ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "USD", debug: true })
      .then((paypal) => {
        if (!paypal || !paypal.Buttons) {
          return;
        }

        paypal
          .Buttons({
            // Step 3: Create an order
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: 'USD',
                    value: '10.00' // Replace with your product price
                  }
                }],
                intent: "CAPTURE"
              });
            },
            // Step 4: Capture the order
            onApprove: (data, actions) => {
              if (!actions.order) {
                throw new Error('No order found');
              }
              console.log('Order approved:', data);
              return actions.order.capture().then((details) => {
                console.log('Transaction completed by ', details);
                // Handle successful transaction here
                alert('Transaction completed by ' + details.payment_source?.paypal?.name?.given_name);
              });
            },
            // Handle error cases
            onError: (err) => {
              console.error('PayPal Buttons error', err);
              alert('An error occurred during the transaction.');
            },
            // Optional: Handle when the user cancels the transaction
            onCancel: (data) => {
              console.log('Transaction cancelled', data);
              alert('Transaction cancelled.');
            }
          })
          .render(`#${idPaypal}`)
          .then(() => {
            console.log('PayPal Buttons rendered');
          })
          .catch((error) => {
            console.error('Failed to render the PayPal Buttons', error);
          });

        return paypal;
      })
      .catch((error) => {
        console.error('Failed to load the PayPal JS SDK script', error);
      });
  });

  return (
    <>
      <div id={`${idPaypal}`}></div>
    </>
  );
});

