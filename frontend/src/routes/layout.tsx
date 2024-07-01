import { component$, createContextId, Slot, useContextProvider } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { serverDatabaseUserSession } from "./seedDatabase";
import { type ExtendSession } from "./plugin@auth";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};



export const useUserSession = routeLoader$(async (data) => {
  const currentSession = data.sharedMap.get("session") as ExtendSession;
  if (new Date(currentSession.expires) < new Date()) return {
    success: false,
    value: null,
    error: "No Session",
}
const db = await serverDatabaseUserSession();
if (!db.success) return {
  success: false,
  value: null,
  error: "Could Not Connect to user DB",
}


const userGatherData = await db.value?.query(`
  RETURN fn::user_intake();
`);

console.log(userGatherData[0].totals)
console.log(currentSession.database.profile)

const energy = (Number(userGatherData[0].totals[0].total_calories) / Number(currentSession.database.profile.overview?.TEE)) * 100;

  return {
    success: false,
    value: {
      energy
    },
    error: null,
  }
});

export type UseUserSession = ReturnType<typeof useUserSession>

export const ContextUserSesstion = createContextId<UseUserSession>("ContextUserSesstion")

export default component$(() => {
  const sesstionUser = useUserSession();
  useContextProvider(ContextUserSesstion,  sesstionUser)

  return <Slot />;
});
