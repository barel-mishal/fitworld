import { component$, useComputed$, useContextProvider } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { BottomNavBar } from '~/components/layout_blocks/NavBar/Navs';
import { type ReturnTypeSession, useAuthSession, useAuthSignout } from '~/routes/plugin@auth';
import { useUpdateProfile, contextUpdateProfile, UserPhoto, UserTitle, UserProgress, UserShares, OverView, UserWeeklyProgress } from '~/components/UserComponent/User';

export default component$(() => {
  const auth = useAuthSession().value as ReturnTypeSession | null;
  const signOut = useAuthSignout();
  const computeDateFormat = useComputed$(() => {
    const dateRaw = auth?.expires ?? "";
    const intrlazetionDatetimeApi = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });
    const date = new Date(dateRaw);
    return intrlazetionDatetimeApi.format(date)
  });

  if (!auth) {
    return <div>Loading...</div>
  }
  const update = useUpdateProfile(auth.database.profile, auth.database.person);
  useContextProvider(contextUpdateProfile, update)
  return (
    <div class="grid grid-rows-[1fr,55px] bg-gray-950 overflow-y-scroll h-screen ">
        <div class={cn("grid gap-3  place-content-start text-gray-50 bg-gray-950 font-roundsans pb-12 overflow-y-auto")}>
          <UserPhoto />
          <UserTitle email={auth.user?.email ?? ""} joind={computeDateFormat.value} />
          <UserProgress />
          <UserShares />
          <OverView />
          <UserWeeklyProgress />
          <button onMouseDown$={() => signOut.submit({ callbackUrl: '/signedout' })} class="border-red-700 m-2 p-3 border-2 rounded-lg text-red-700 ">Sign Out</button>
        </div>
        <div>
          <BottomNavBar  user={{class: "--tw bg-sky-300/20 p-1 m-2 rounded-md outline-2 outline outline-indigo-200 "}} />
        </div>
    </div>
  );
}); 
